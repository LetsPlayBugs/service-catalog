import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';
describe('ServicesController', () => {
  let controller: ServicesController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
