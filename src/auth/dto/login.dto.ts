import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'The username for login'
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for login'
  })
  @IsString()
  password: string;
}
