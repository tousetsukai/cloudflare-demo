import { createRoute } from 'honox/factory';
import { UserRepository } from '../../../infra/d1/userRepository';

export default createRoute(async (c) => {
  const userRepository = new UserRepository(c.env.DB);
  const { username } = c.req.param();
  const user = await userRepository.findUserByUsername(username);
  return c.render(
    <div class="py-8 text-center">
      <h1 class="text-3xl font-bold">User Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Display Name: {user.displayName}</p>
          <p>Cohort Number: {user.cohortNumber.toString()}</p>
          <p>Created At: {user.createdAt.toISOString()}</p>
          <p>Updated At: {user.updatedAt.toISOString()}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
      <a href="/" class="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>,
  );
});
