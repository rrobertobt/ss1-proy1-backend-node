import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserAddressDto {
  @ApiProperty({ 
    example: '123 Main Street', 
    description: 'The first line of the address' 
  })
  @IsString()
  address_line1: string;

  @ApiPropertyOptional({ 
    example: 'Apt 4B', 
    description: 'The second line of the address (optional)' 
  })
  @IsOptional()
  @IsString()
  address_line2?: string;

  @ApiProperty({ 
    example: 'Guatemala City', 
    description: 'The city of the address' 
  })
  @IsString()
  city: string;

  @ApiPropertyOptional({ 
    example: 'Guatemala', 
    description: 'The state or province of the address (optional)' 
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ 
    example: '01001', 
    description: 'The postal code of the address (optional)' 
  })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiProperty({ 
    example: 1, 
    description: 'The country ID from the country catalog',
    type: Number
  })
  @IsNumber()
  country_id: number;

  @ApiPropertyOptional({ 
    example: false, 
    description: 'Whether this is the default address (optional)',
    type: Boolean,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;

  @ApiPropertyOptional({ 
    example: false, 
    description: 'Whether this is the default billing address (optional)',
    type: Boolean,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  is_billing_default?: boolean;

  @ApiPropertyOptional({ 
    example: false, 
    description: 'Whether this is the default shipping address (optional)',
    type: Boolean,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  is_shipping_default?: boolean;
}