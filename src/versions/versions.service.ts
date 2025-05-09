import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Injectable()
export class VersionsService {
  create(createVersionDto: CreateVersionDto) {
    throw new NotImplementedException();
  }

  findAll() {
    throw new NotImplementedException();
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
