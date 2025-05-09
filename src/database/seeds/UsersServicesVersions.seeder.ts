import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Service } from '../../services/entities/service.entity';
import { Version } from '../../versions/entities/version.entity';
import { User } from '../../users/entities/user.entity';

export default class UserServicesVersionsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const serviceFactory = factoryManager.get(Service);
    const versionFactory = factoryManager.get(Version);
    const userFactory = factoryManager.get(User);

    const user1 = await userFactory.save({
      email: 'kevin@workstream.is',
      password: 'password',
    });

    const user2 = await userFactory.save({
      email: 'john@workstream.is',
      password: 'password',
    });

    const users = [user1, user2];

    // Create services for each user
    for (const user of users) {
      const services = await Promise.all(
        Array(100)
          .fill(null)
          .map(() => serviceFactory.save({ user })),
      );

      // Create versions for each service
      for (const service of services) {
        const numVersions = Math.floor(Math.random() * 4) + 2;
        await Promise.all(
          Array(numVersions)
            .fill(null)
            .map((_, i) =>
              versionFactory.save({
                service,
                isActive: i === numVersions - 1,
              }),
            ),
        );
      }
    }
  }
}
