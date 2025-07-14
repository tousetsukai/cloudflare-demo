import { revokeSession } from '@hono/oidc-auth';
import { createRoute } from 'honox/factory';

export default createRoute(async (c) => {
  await revokeSession(c);
  return c.render(
    <div class="py-8 text-center">
      <h1 class="text-3xl font-bold">You have been logged out</h1>
      <p class="mt-4">Thank you for using our service!</p>
      <a href="/" class="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>,
  );
});
