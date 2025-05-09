import { setSeederFactory } from 'typeorm-extension';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';

export default setSeederFactory(
  Service,
  async (faker, dataSource, user?: User) => {
    const name = faker.company.name();
    const description = faker.company.catchPhrase();

    // If no user is provided, create a default one
    if (!user) {
      user = new User(faker.internet.email(), faker.internet.password(), []);
    }

    return new Service(name, description, [], user);
  },
);
