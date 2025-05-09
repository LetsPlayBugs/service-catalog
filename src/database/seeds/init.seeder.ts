import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import ServiceFactory from '../factories/service.factory';
import VersionFactory from '../factories/version.factory';
import UserServicesVersionsSeeder from './UsersServicesVersions.seeder';
import UserFactory from '../factories/user.factory';
export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    // Clean up existing data
    await dataSource.query('TRUNCATE TABLE "version" CASCADE');
    await dataSource.query('TRUNCATE TABLE "service" CASCADE');
    await dataSource.query('TRUNCATE TABLE "user" CASCADE');

    // Run seeders
    await runSeeders(dataSource, {
      seeds: [UserServicesVersionsSeeder],
      factories: [ServiceFactory, VersionFactory, UserFactory],
    });
  }
}
