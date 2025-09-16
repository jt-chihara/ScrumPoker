mod durable;
mod messages;
mod models;
mod router;
mod websocket;
mod utils;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use worker::{event, Context, Env, Request, Response, Result};

#[event(fetch)]
pub async fn main(req: Request, env: Env, ctx: Context) -> Result<Response> {
    utils::set_panic_hook();
    router::handle_request(req, env, ctx).await
}
