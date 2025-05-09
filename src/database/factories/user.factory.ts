import { setSeederFactory } from 'typeorm-extension';

import { User } from '../../users/entities/user.entity';

export default setSeederFactory(User, async (faker) => {
  const email = faker.internet.email();
  const password = 'password';

  return new User(email, password, []);
});
