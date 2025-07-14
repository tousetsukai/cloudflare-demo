import { createRoute } from 'honox/factory';
import { oidcAuthMiddleware } from '@hono/oidc-auth';

export default createRoute(oidcAuthMiddleware());
