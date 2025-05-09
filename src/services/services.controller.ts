import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationParams } from '../common/decorators/pagination-params.decorator';
import { SortingParams } from '../common/decorators/sorting-params.decorator';
import { FilteringParams } from '../common/decorators/filtering-params.decorator';
import { type Pagination } from '../common/decorators/pagination-params.decorator';
import { type Sorting } from '../common/decorators/sorting-params.decorator';
import { type Filtering } from '../common/decorators/filtering-params.decorator';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../authentication/authentication.service';
import { plainToInstance } from 'class-transformer';
import { FindOneResponseDto } from './response/findOne.response.dto';
@Controller('v1/services')
@UseGuards(AuthenticationGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {  }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['name']) filter: Filtering,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.servicesService.findAll(pagination, sort, filter, user);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('fields[]') fields: string | string[],
    @CurrentUser() user: AuthenticatedUser
  ) {
    const fieldsArray = this.parseFields(fields);    
    if (!this.validFields(fieldsArray)) {
      throw new BadRequestException('Invalid fields');
    }

    const service = await this.servicesService.findOne(id, user, fieldsArray);
    return plainToInstance(FindOneResponseDto, service, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  private parseFields(fields: string | string[]) {
    // Single field parameters will be string. eg. fields[] = name
    return fields ? (Array.isArray(fields) ? fields : fields.split(',')) : [];
  }

  private validFields(fields: string[]) {
    if (fields.length === 0) {
      return true;
    }
    const columns = Object.keys(this.servicesService.getColumns());
    return fields.every(field => columns.includes(field));
  }
}
