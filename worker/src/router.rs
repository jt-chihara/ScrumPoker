use worker::{Context, Env, Request, Response, Result};

pub async fn handle_request(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let url = req.url()?;
    let path = url.path().to_string();

    if path.starts_with("/ws/room/") {
        return handle_websocket(req, env, path).await;
    }

    if path.starts_with("/api/room/") {
        return handle_api(req, env, path).await;
    }

    Response::error("Not Found", 404)
}

async fn handle_websocket(req: Request, env: Env, path: String) -> Result<Response> {
    let segments: Vec<&str> = path.trim_start_matches('/').split('/').collect();
    if segments.len() < 3 {
        return Response::error("Invalid room path", 400);
    }
    let room_id = segments[2].to_uppercase();

    let url = req.url()?;
    let mut user_name: Option<String> = None;
    for (key, value) in url.query_pairs() {
        if key == "name" {
            user_name = Some(value.to_string());
            break;
        }
    }

    let user_name = user_name.unwrap_or_else(|| "匿名ユーザー".into());

    let namespace = env.durable_object("ROOM_DURABLE_OBJECT")?;
    let id = namespace.id_from_name(&room_id)?;
    let stub = id.get_stub()?;
    // Forward the original upgrade request to the room Durable Object
    let response = stub.fetch_with_request(req).await?;
    Ok(response)
}

async fn handle_api(mut req: Request, env: Env, path: String) -> Result<Response> {
    // Expected: /api/room/:id/{state|join|leave|vote|show-results|reset}
    let segs: Vec<&str> = path.trim_start_matches('/').split('/').collect();
    if segs.len() < 4 {
        return Response::error("Invalid API path", 400);
    }
    let room_id = segs[2].to_uppercase();
    let action = segs[3];

    let namespace = env.durable_object("ROOM_DURABLE_OBJECT")?;
    let id = namespace.id_from_name(&room_id)?;
    let stub = id.get_stub()?;

    // Map API path to DO internal path
    let internal_path = match (req.method().to_string().as_str(), action) {
        ("GET", "state") => "/state",
        ("POST", "join") => "/join",
        ("POST", "leave") => "/leave",
        ("POST", "vote") => "/vote",
        ("POST", "show-results") => "/show-results",
        ("POST", "reset") => "/reset",
        _ => return Response::error("Unsupported API route", 404),
    };

    // Build a new Request targeted to the DO with original body (if any)
    use wasm_bindgen::JsValue;
    use worker::{Method, RequestInit};
    let mut init = RequestInit::new();
    init.with_method(req.method());
    if let Ok(text) = req.text().await {
        if !text.is_empty() {
            init.with_body(Some(JsValue::from_str(&text)));
        }
    }
    let mut do_req = Request::new_with_init(&format!("https://do{internal_path}"), &init)?;
    if let Ok(headers) = do_req.headers_mut() {
        let _ = headers.set("Content-Type", "application/json");
    }

    let mut resp = stub.fetch_with_request(do_req).await?;
    Ok(resp)
}
