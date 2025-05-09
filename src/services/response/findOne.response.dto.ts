import { ApiProperty } from "@nestjs/swagger";
import { Service } from "../entities/service.entity";
import { Exclude, Expose, Type } from "class-transformer";
export class UserResponseDto {
  @ApiProperty({
    type: String,
  })
  @Expose()
  id!: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  email!: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  createdAt!: string;
  
  @ApiProperty({
    type: String,
  })
  @Expose()
  updatedAt!: string;

  @ApiProperty({
    type: String,
  })
  @Exclude()
  password!: string;
}

export class VersionResponseDto {
  @ApiProperty({
    type: String,
  })
  @Expose()
  id!: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  versionNumber!: string;

  @ApiProperty({
    type: Boolean,
  })
  @Expose()
  isActive!: boolean;

  @ApiProperty({
    type: String,
  })
  @Expose()
  createdAt!: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  updatedAt!: string;
}

export class FindOneResponseDto {
  @ApiProperty({
    type: Service,
  })
  @Expose()
  service!: Service;

  @ApiProperty({
    type: () => UserResponseDto,
  })
  @Expose()
  @Type(() => UserResponseDto)
  user!: UserResponseDto;

  @Expose()
  @Type(() => VersionResponseDto)
  versions!: VersionResponseDto[];

  @ApiProperty({
    type: String,
  })
  @Expose()
  id!: string;

  @ApiProperty({
    type: String,
  })
  @Expose()
  name!: string;
  
  @ApiProperty({
    type: String,
  })
  @Expose()
  description!: string; 

  @ApiProperty({
    type: String,
  })  
  @Expose()
  createdAt!: string;   

  @ApiProperty({
    type: String,
  })
  @Expose()
  updatedAt!: string;

  @ApiProperty({
    type: Number,
  })
  @Expose()
  totalVersions!: number;
}
