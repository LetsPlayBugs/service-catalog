import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  afterAll(async () => {
    await module.get(Connection).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
