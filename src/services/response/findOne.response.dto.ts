import { ApiProperty } from "@nestjs/swagger";
import { Service } from "../entities/service.entity";
import { Expose, Type } from "class-transformer";
import { VersionResponseDto } from "src/versions/response/version.response.dto";
import { UserResponseDto } from "src/users/response/user.response.dto";

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
