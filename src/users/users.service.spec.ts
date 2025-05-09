import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
