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
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('v1/services')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of services',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (0-based)',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Sort field and direction (e.g., "name:desc")',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter criteria (e.g., "name:search:value")',
  })
  async findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['name']) filter: Filtering,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.servicesService.findAll(pagination, sort, filter, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiResponse({ status: 200, description: 'Returns the service' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  @ApiParam({ name: 'id', type: String, description: 'Service ID' })
  @ApiQuery({
    name: 'fields[]',
    required: false,
    type: String,
    isArray: true,
    description:
      'Fields to include in the response. Allowed values: name, description, versions (returns the latest two active versions), user',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('fields[]') fields: string | string[],
    @CurrentUser() user: AuthenticatedUser,
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
    return fields.every((field) => columns.includes(field));
  }
}
