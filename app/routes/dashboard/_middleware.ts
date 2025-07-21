import { getAuth, oidcAuthMiddleware } from '@hono/oidc-auth';
import { createRoute } from 'honox/factory';
import { CheckRegisteredUseCase } from '../../../domain/usecases/checkRegistered';
import { UserRepository } from '../../../infra/d1/userRepository';

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
