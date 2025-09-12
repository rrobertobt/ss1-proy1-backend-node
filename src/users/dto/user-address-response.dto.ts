import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the country' })
  id: number;

  @ApiProperty({ example: 'Guatemala', description: 'The name of the country' })
  name: string;
}

export class UserAddressResponseDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user address' })
  id: number;

  @ApiProperty({ example: '123 Main Street', description: 'The first line of the address' })
  address_line1: string;

  @ApiProperty({ example: 'Apt 4B', description: 'The second line of the address', nullable: true })
  address_line2: string | null;

  @ApiProperty({ example: 'Guatemala City', description: 'The city of the address' })
  city: string;

  @ApiProperty({ example: 'Guatemala', description: 'The state or province of the address', nullable: true })
  state: string | null;

  @ApiProperty({ example: '01001', description: 'The postal code of the address', nullable: true })
  postal_code: string | null;

  @ApiProperty({ type: CountryResponseDto, description: 'The country information' })
  country: CountryResponseDto;

  @ApiProperty({ example: false, description: 'Whether this is the default address' })
  is_default: boolean;

  @ApiProperty({ example: false, description: 'Whether this is the default billing address' })
  is_billing_default: boolean;

  @ApiProperty({ example: false, description: 'Whether this is the default shipping address' })
  is_shipping_default: boolean;
}

export class UserAddressesResponseDto {
  @ApiProperty({ 
    type: 'object',
    properties: {
      addresses: {
        type: 'array',
        items: { $ref: '#/components/schemas/UserAddressResponseDto' }
      }
    },
    description: 'Container for user addresses'
  })
  data: {
    addresses: UserAddressResponseDto[];
  };
}