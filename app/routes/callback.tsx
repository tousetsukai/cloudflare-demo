import { processOAuthCallback } from '@hono/oidc-auth';
import { createRoute } from 'honox/factory';

export default createRoute((c) => {
  return processOAuthCallback(c);
});
