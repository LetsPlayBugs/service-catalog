import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('ServicesService', () => {
  let service: ServicesService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
