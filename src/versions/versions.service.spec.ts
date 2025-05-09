import { Test, TestingModule } from '@nestjs/testing';
import { VersionsService } from './versions.service';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('VersionsService', () => {
  let service: VersionsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<VersionsService>(VersionsService);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
