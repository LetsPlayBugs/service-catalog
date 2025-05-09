import { setSeederFactory } from 'typeorm-extension';
import { Version } from '../../versions/entities/version.entity';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export default setSeederFactory(
  Version,
  async (faker, dataSource: DataSource, service?: Service) => {
    const major = faker.number.int({ min: 1, max: 10 });
    const minor = faker.number.int({ min: 0, max: 99 });
    const patch = faker.number.int({ min: 0, max: 99 });
    const versionNumber = `${major}.${minor}.${patch}`;

    // If no service is provided, create a default one
    if (!service) {
      const user = new User(
        faker.internet.email(),
        faker.internet.password(),
        [],
      );
      service = new Service(
        faker.company.name(),
        faker.company.catchPhrase(),
        [],
        user,
      );
    }

    return new Version(versionNumber, false, service);
  },
);
