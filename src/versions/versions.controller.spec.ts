import { Test, TestingModule } from '@nestjs/testing';
import { VersionsController } from './versions.controller';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('VersionsController', () => {
  let controller: VersionsController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<VersionsController>(VersionsController);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
