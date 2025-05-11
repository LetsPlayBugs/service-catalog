/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sorting } from '../common/decorators/sorting-params.decorator';
import { Pagination } from '../common/decorators/pagination-params.decorator';
import { Filtering } from '../common/decorators/filtering-params.decorator';
import { getWhere } from '../common/decorators/helpers';
import { getOrder } from '../common/decorators/helpers';
import { AuthenticatedUser } from '../authentication/authentication.service';
import { Version } from '../versions/entities/version.entity';
@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
  ) {}

  public create(createServiceDto: CreateServiceDto) {
    throw new NotImplementedException();
  }

  public async findAll(
    { offset, size, page }: Pagination,
    sort: Sorting,
    filter: Filtering,
    user: AuthenticatedUser,
  ) {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const queryBuilder = this.serviceRepository
      .createQueryBuilder('service')
      .loadRelationCountAndMap('service.versionCount', 'service.versions');

    queryBuilder.andWhere('service.userId = :userId', { userId: user.id });

    if (where) {
      Object.entries(where).forEach(([key, value]) => {
        if (
          value instanceof Object &&
          'type' in value &&
          value.type === 'raw'
        ) {
          queryBuilder.andWhere(
            `similarity(service.${key}, :${key}) > 0.1`,
            value.objectLiteralParameters,
          );
        }
      });
    }

    if (order) {
      Object.entries(order).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`service.${key}`, value);
      });
    }

    const [services, total] = await queryBuilder
      .skip(offset)
      .take(size)
      .getManyAndCount();

    return {
      totalItems: total,
      items: services,
      page,
      size,
    };
  }

  public async findOne(id: string, user: AuthenticatedUser, fields?: string[]) {
    const relations = [];
    let selectFields = {};

    const topVersions: Version[] = [];
    let totalVersionCount = 0;

    if (fields && fields.length > 0) {
      selectFields = { id: true, createdAt: true, updatedAt: true };
      if (fields.includes('versions')) {
        const [relatedVersions, totalActiveVersions] =
          await this.versionRepository.findAndCount({
            where: {
              service: {
                id: id,
              },
              isActive: true,
            },
            order: {
              createdAt: 'DESC',
            },
            take: 2,
          });
        topVersions.push(...relatedVersions);
        totalVersionCount = totalActiveVersions;
      }
      if (fields.includes('user')) {
        relations.push('user');
      }

      selectFields = {
        ...selectFields,
        ...fields
          .filter((field) => field !== 'versions' && field !== 'user')
          .reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      };
    }

    const options: FindOneOptions<Service> = {
      where: {
        id: id,
        user: {
          id: user.id,
        },
      },
      select: selectFields,
      relations,
    };

    const service = await this.serviceRepository.findOne(options);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return {
      ...service,
      ...(topVersions.length > 0 && {
        versions: topVersions,
        totalActiveVersions: totalVersionCount,
      }),
    };
  }

  public update(id: string, updateServiceDto: UpdateServiceDto) {
    throw new NotImplementedException();
  }

  public remove(id: string) {
    throw new NotImplementedException();
  }

  public getColumns() {
    return this.serviceRepository.metadata.propertiesMap;
  }
}
