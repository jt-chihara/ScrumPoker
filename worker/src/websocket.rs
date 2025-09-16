use worker::{Error, Request, Response, Result, WebSocketPair};

pub async fn handle(req: Request, _room_id: String, _user_name: String) -> Result<Response> {
    ensure_websocket(&req)?;
    let pair = WebSocketPair::new()?;
    let server = pair.server;
    let client = pair.client;

    server.accept()?;

    Response::from_websocket(client)
}

fn ensure_websocket(req: &Request) -> Result<()> {
    let upgrade = req
        .headers()
        .get("Upgrade")?
        .unwrap_or_default()
        .to_ascii_lowercase();
    if upgrade != "websocket" {
        Err(Error::RustError("Expected WebSocket upgrade".into()))
    } else {
        Ok(())
    }
}
