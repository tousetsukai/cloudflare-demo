import { Hono } from "hono";
import users from "./users";
import andons from "./andons";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/users", users);
app.route("/andons", andons);

export default app;
