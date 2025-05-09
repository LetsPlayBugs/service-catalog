import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthenticationService } from '../authentication/authentication.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Version } from '../versions/entities/version.entity';
import { DataSource } from 'typeorm';
import { servicesVersion } from 'typescript';

describe('ServicesController (e2e)', () => {
  let app: INestApplication<App>;
  let userRepository: Repository<User>;
  let authService: AuthenticationService;
  let serviceRepository: Repository<Service>;
  let token: string;
  let dataSource: DataSource;
  let testUser: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    authService = moduleFixture.get<AuthenticationService>(
      AuthenticationService,
    );
    serviceRepository = moduleFixture.get<Repository<Service>>(
      getRepositoryToken(Service),
    );
    dataSource = moduleFixture.get<DataSource>(DataSource);

    // Reset database
    await dataSource.query('TRUNCATE TABLE "version" CASCADE');
    await dataSource.query('TRUNCATE TABLE "service" CASCADE');
    await dataSource.query('TRUNCATE TABLE "user" CASCADE');

    // Data setup
    testUser = new User('test@example.com', 'password123', []);

    testUser.services = [
      new Service('Service a', 'Description a', [], testUser),
      new Service('Service b group', 'Description b', [], testUser),
      new Service('Service c', 'Description c', [], testUser),
      new Service('Service d group', 'Description d', [], testUser),
      new Service('Service e', 'Description e', [], testUser),
      new Service('Service f', 'Description f', [], testUser),
      new Service('Service g', 'Description g', [], testUser),
      new Service('Service h group', 'Description h', [], testUser),
      new Service('Service i', 'Description i', [], testUser),
      new Service('Service j group', 'Description j', [], testUser),
    ];

    for (let i = 0; i < testUser.services.length; i++) {
      const service = testUser.services[i];
      // Wait.. so that versions have different createdAt dates
      service.versions = [new Version(`1.0.${i}`, true, service)];
      if (i % 2 === 0) {
        service.versions.push(new Version(`2.0.${i}`, false, service));
      }
      service.versions.push(new Version(`3.0.${i}`, true, service))
      service.versions.push(new Version(`4.0.${i}`, false, service))
    }

    await userRepository.save(testUser);

    // Get authentication token
    const user = await authService.validateUser(
      'test@example.com',
      'password123',
    );
    const loginResult = await authService.login(user);
    token = loginResult.access_token;
  });

  afterEach(async () => {
    await dataSource.query('TRUNCATE TABLE "version" CASCADE');
    await dataSource.query('TRUNCATE TABLE "service" CASCADE');
    await dataSource.query('TRUNCATE TABLE "user" CASCADE');
    await app.close();
  });

  describe('GET v1/services', () => {
    it('returns 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('returns 200 when authenticated', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            totalItems: 10,
            page: 0,
            size: 5,
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service a',
                description: 'Description a',
                versionCount: 4,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service b group',
                description: 'Description b',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service c',
                description: 'Description c',
                versionCount: 4,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service d group',
                description: 'Description d',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service e',
                description: 'Description e',
                versionCount: 4,
              }),
            ]),
          });
        });
    });

    it('paginates', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .set('Authorization', `Bearer ${token}`)
        .query({
          page: 1,
          size: 3,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            totalItems: 10,
            page: 1,
            size: 3,
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service d group',
                description: 'Description d',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service e',
                description: 'Description e',
                versionCount: 4,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service f',
                description: 'Description f',
                versionCount: 3,
              }),
            ]),
          });
        });
    });

    it('paginates with sort', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .set('Authorization', `Bearer ${token}`)
        .query({
          page: 1,
          size: 3,
          sort: 'name:desc',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            totalItems: 10,
            page: 1,
            size: 3,
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service g',
                description: 'Description g',
                versionCount: 4,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service f',
                description: 'Description f',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service e',
                description: 'Description e',
                versionCount: 4,
              }),
            ]),
          });
        });
    });

    it('handles bad sort', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .set('Authorization', `Bearer ${token}`)
        .query({
          page: 1,
          size: 3,
          sort: 'random:desc',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchObject({
            statusCode: 400,
            message: 'Invalid sort property: random',
          });
        });
    });

    it('paginates with sort and filter with fuzzy search', () => {
      return request(app.getHttpServer())
        .get('/v1/services')
        .set('Authorization', `Bearer ${token}`)
        .query({
          page: 0,
          size: 3,
          sort: 'name:desc',
          // Note the intentional typo in the filter to test fuzzy search
          filter: 'name:search:goup',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            totalItems: 4,
            page: 0,
            size: 3,
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service j group',
                description: 'Description j',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service h group',
                description: 'Description h',
                versionCount: 3,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: 'Service d group',
                description: 'Description d',
                versionCount: 3,
              }),
            ]),
          });
        });
    });
  });

  describe('GET v1/services/:id', () => {
    it('returns 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .get('/v1/services/1')
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('returns 400 when id is not a valid uuid', () => {
      return request(app.getHttpServer())
        .get('/v1/services/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchObject({
            statusCode: 400,
            message: 'Validation failed (uuid is expected)',
          });
        });
    });

    it('returns 200', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: serviceId,
            name: 'Service a',
            description: 'Description a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
    });

    it('handles a bad field', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          'fields[]': 'random'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            statusCode: 400,
            message: 'Invalid fields',
            error: 'Bad Request',
          });
        });
    });

    it('handles a bad field in array query param format', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}?fields[]=random`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            statusCode: 400,
            message: 'Invalid fields',
            error: 'Bad Request',
          });
        });
    });

    it('handles a single name field', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          'fields[]': 'name'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: serviceId,
            name: 'Service a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });

    it('handles a multiple fields', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          'fields[]': 'name,description'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: serviceId,
            name: 'Service a',
            description: 'Description a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });

    it('handles user field', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          'fields[]': 'name,description,user'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: serviceId,
            name: 'Service a',
            description: 'Description a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: {
              // Note the user object should never include password
              id: testUser.id,
              email: testUser.email,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }
          });
        });
    });

    it('handles versions field', async () => {
      const service = testUser.services[0];
      const serviceId = service.id;
      
      for (let i = 0; i < service.versions.length; i++) {
        service.versions[i].createdAt = new Date(Date.now() + i * 1000);      }
      await serviceRepository.save(service);

      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .query({
          'fields[]': 'name,description,user,versions'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: serviceId,
            name: 'Service a',
            description: 'Description a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: {
              // Note the user object should never include password
              id: testUser.id,
              email: testUser.email,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
            totalVersions: 2,
            // Note it should only return 2 versions and they should be sorted by createdAt
            versions: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                versionNumber: '3.0.0',
                isActive: true,
              }),
              expect.objectContaining({
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                versionNumber: '1.0.0',
                isActive: true,
              }),
            ]),
          });
        });
    });

    it('handles array query param format', () => {
      const serviceId = testUser.services[0].id;
      return request(app.getHttpServer())
        .get(`/v1/services/${serviceId}?fields[]=name&fields[]=description&fields[]=user`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            id: serviceId,
            name: 'Service a',
            description: 'Description a',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: {
              id: testUser.id,
              email: testUser.email,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }
          });
        });
    });
  });
});
