import { createRoute } from 'honox/factory';
import Counter from '../islands/counter';

export default createRoute(async (c) => {
  const name = c.req.query('name') ?? 'Hono';
  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <Counter />
      <a href="/dashboard" class="text-blue-500 hover:underline">
        Go to Dashboard
      </a>
      <a href="/logout" class="ml-4 text-blue-500 hover:underline">
        Logout
      </a>
    </div>,
  );
});
