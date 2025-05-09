import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
