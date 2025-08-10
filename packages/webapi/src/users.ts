import { UserRepository } from "@satsukita-andon/infra/d1";
import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/users/:username", async (c) => {
  const { username } = c.req.param();
  const userRepository = new UserRepository(c.env.DB);
  const user = await userRepository.findByUsername(username);
  return c.json(user);
});

export default app;
