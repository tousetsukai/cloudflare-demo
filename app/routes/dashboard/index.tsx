import { getAuth } from '@hono/oidc-auth';
import { createRoute } from 'honox/factory';

export default createRoute(async (c) => {
  const auth = await getAuth(c);
  return c.render(
    <div class="py-8 text-center">
      <h1 class="text-3xl font-bold">You have been logged in!</h1>
      <p>{`Hello <${auth?.email}>!`}</p>
      <a href="/" class="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>,
  );
});
