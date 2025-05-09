import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from '../versions/entities/version.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Service, Version])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
