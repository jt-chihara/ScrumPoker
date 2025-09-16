use worker::{Context, Env, Request, Response, Result};

pub async fn handle_request(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    Response::error("Not implemented", 501)
}
