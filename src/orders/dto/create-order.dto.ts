import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Shipping address id',
    type: Number,
  })
  shippingAddressId: number;

  @ApiProperty({
    description: 'Billing address id',
    type: Number,
  })
  billingAddressId: number;

  @ApiProperty({
    description: 'Payment method id',
    type: Number,
  })
  paymentMethodId: number;

  @ApiProperty({
    description: 'Card id',
    type: Number,
  })
  cardId: number;

  @ApiProperty({
    description: 'Additional notes related to the order',
    type: String,
  })
  notes: string;
}
