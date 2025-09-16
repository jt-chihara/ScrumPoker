FROM node:20-alpine

WORKDIR /workspace/web

ENV HUSKY=0

EXPOSE 5173

CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0 --port 5173"]
