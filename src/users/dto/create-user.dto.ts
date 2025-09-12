import { IsString, IsEmail, MinLength, IsOptional, IsNumber, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  last_name: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'The password for the user account',
    minLength: 6 
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ 
    example: 1,
    description: 'The gender ID from the gender catalog (optional)',
    type: Number
  })
  @IsOptional()
  @IsNumber()
  gender_id?: number;

  @ApiPropertyOptional({ 
    example: '+1234567890',
    description: 'The user\'s phone number (optional)',
    pattern: '^\+?[1-9]\d{1,14}$'
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { 
    message: 'Phone number must be in E.164 format (e.g., +1234567890)'
  })
  phone?: string;
}
