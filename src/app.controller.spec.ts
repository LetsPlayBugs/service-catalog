import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { Connection } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  describe('root', () => {
    it('should return "Welcome to Kongs Services API"', () => {
      expect(appController.getHello()).toBe('Welcome to Kongs Services API');
    });
  });
});
