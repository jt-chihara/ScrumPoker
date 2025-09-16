#!/bin/sh
set -eu

echo "[build-worker] Building Rust worker" >&2

if ! command -v worker-build >/dev/null 2>&1; then
  echo "[build-worker] worker-build not found. Installing..." >&2
  cargo install worker-build
fi

cd "$(dirname "$0")/../worker"
worker-build --release
