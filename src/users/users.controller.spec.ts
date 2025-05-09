import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
