import { ApiProperty } from "@nestjs/swagger";
import { Expose, Exclude } from "class-transformer";

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
