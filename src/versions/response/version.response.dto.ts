import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

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
