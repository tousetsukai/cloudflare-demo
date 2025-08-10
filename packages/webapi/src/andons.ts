import { Hono } from "hono";

const app = new Hono();

app.get("/andons", (c) => c.text("Andons!"));

export default app;
