FROM node:20-bookworm

ENV DEBIAN_FRONTEND=noninteractive \
    RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential pkg-config libssl-dev ca-certificates curl git \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --profile minimal \
    && rustup target add wasm32-unknown-unknown

RUN npm install -g wrangler@3 \
    && cargo install worker-build \
    && cargo install wasm-bindgen-cli --version 0.2.92

WORKDIR /workspace

EXPOSE 8787

CMD ["wrangler", "dev", "--local", "--persist-to", "/workspace/.wrangler/state", "--port", "8787", "--ip", "0.0.0.0"]
