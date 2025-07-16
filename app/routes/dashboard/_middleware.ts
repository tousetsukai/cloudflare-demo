import { createRoute } from 'honox/factory';
import { getAuth, oidcAuthMiddleware } from '@hono/oidc-auth';
import { UserRepository } from '../../../infra/d1/userRepository';
import { CheckRegisteredUseCase } from '../../../domain/usecases/checkRegistered';

export default createRoute(oidcAuthMiddleware(), async (c, next) => {
  const repo = new UserRepository(c.env.DB);
  const check = new CheckRegisteredUseCase(repo);
  const auth = await getAuth(c);
  if (auth === null || auth.email === undefined) {
    return c.redirect('/login');
  }
  const exists = await check.execute(auth.email as string);
  if (!exists) {
    return c.redirect('/register');
  }
  await next();
});
