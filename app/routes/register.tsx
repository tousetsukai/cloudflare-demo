import { getAuth, oidcAuthMiddleware } from '@hono/oidc-auth';
import { createRoute } from 'honox/factory';
import { CheckRegisteredUseCase } from '../../domain/usecases/checkRegistered';
import { Ordinal } from '../../domain/values/ordinal';
import { UserRepository } from '../../infra/d1/userRepository';

export const POST = createRoute(oidcAuthMiddleware(), async (c) => {
  const auth = await getAuth(c);
  if (auth === null || auth.email === undefined) {
    return c.redirect('/login');
  }
  const repo = new UserRepository(c.env.DB);
  const check = new CheckRegisteredUseCase(repo);
  const exists = await check.execute(auth.email as string);
  if (exists) {
    return c.redirect('/');
  }

  // validation
  const body = await c.req.formData();
  const motto1 = body.get('motto1') || '';
  const motto2 = body.get('motto2') || '';
  const motto3 = body.get('motto3') || '';
  // サーバ側でチェックされる
  if (motto1 !== '寛容' || motto2 !== '進取' || motto3 !== '良識') {
    return c.render(<div class="text-red-500">北高訓が間違っています。</div>);
  }
  const username = body.get('username') as string;
  const displayName = body.get('displayName') as string;
  const cohortNumber = new Ordinal(
    parseInt(body.get('cohortNumber') as string, 10),
  );

  // TODO: usecase 使う
  const user = await repo.create({
    id: crypto.randomUUID(),
    email: auth.email as string,
    username,
    displayName,
    cohortNumber,
  });

  if (user === null) {
    return c.render(
      <div class="text-red-500">ユーザー登録に失敗しました。</div>,
    );
  }
  return c.render(
    <div class="py-8 text-center">
      <h1 class="text-3xl font-bold">ユーザー登録が完了しました。</h1>
      <p class="mt-4">User ID: {user.id}</p>
      <a href="/" class="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>,
  );
});

// Auth0 に登録済みかつ DB には未登録
export default createRoute(oidcAuthMiddleware(), async (c) => {
  const auth = await getAuth(c);
  if (auth === null || auth.email === undefined) {
    return c.redirect('/login');
  }
  const repo = new UserRepository(c.env.DB);
  const check = new CheckRegisteredUseCase(repo);
  const exists = await check.execute(auth.email as string);
  if (exists) {
    return c.redirect('/');
  }
  return c.render(
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">
          ユーザー登録
        </h1>
        <form class="space-y-4" method="post" action="/register">
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="username"
            placeholder="ユーザー名"
            required
          />
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="displayName"
            placeholder="表示名"
            required
          />
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="cohortNumber"
            placeholder="卒業期"
            required
          />
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="motto1"
            placeholder="北高訓1"
            required
          />
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="motto2"
            placeholder="北高訓2"
            required
          />
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="motto3"
            placeholder="北高訓3"
            required
          />
          <div class="flex items-center">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 text-sm text-gray-700">
              利用規約に同意する
            </label>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            登録
          </button>
        </form>
      </div>
    </div>,
  );
});
