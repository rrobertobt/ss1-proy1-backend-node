import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from './entities/user-address.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
  ) {}

  async create(createUserDto: CreateUserDto, role: Role = Role.CUSTOMER): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password_hash,
      user_type_id: role === Role.ADMIN ? 2 : 1, 
    });

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['type'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['type'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll(page: number = 0, limit: number = 10): Promise<{ data: User[], total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      relations: ['type', 'gender'],
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        is_active: true,
        is_verified: true
      },
      skip: page * limit,
      take: limit,
      order: {
        id: 'DESC'
      }
    });

    return {
      data: users,
      total
    };
  }

  async createUserAddress(userId: number, createUserAddressDto: CreateUserAddressDto): Promise<UserAddress> {
    // Verify that the user exists
    const user = await this.findOne(userId);
    
    const userAddress = this.userAddressRepository.create({
      user_id: userId,
      address_line_1: createUserAddressDto.address_line1,
      address_line_2: createUserAddressDto.address_line2,
      city: createUserAddressDto.city,
      state: createUserAddressDto.state,
      postal_code: createUserAddressDto.postal_code,
      country_id: createUserAddressDto.country_id,
      is_default: createUserAddressDto.is_default || false,
      is_billing_default: createUserAddressDto.is_billing_default || false,
      is_shipping_default: createUserAddressDto.is_shipping_default || false,
    });

    return this.userAddressRepository.save(userAddress);
  }

  async getUserAddresses(userId: number): Promise<UserAddress[]> {
    // Verify that the user exists
    await this.findOne(userId);
    
    return this.userAddressRepository.find({
      where: { user_id: userId },
      relations: ['country'],
      order: { created_at: 'DESC' }
    });
  }

  async updateUserAddress(userId: number, addressId: number, updateUserAddressDto: CreateUserAddressDto): Promise<UserAddress> {
    // Verify that the user exists
    await this.findOne(userId);
    
    // Find the address and verify it belongs to the user
    const existingAddress = await this.userAddressRepository.findOne({
      where: { id: addressId, user_id: userId }
    });

    if (!existingAddress) {
      throw new NotFoundException('Address not found or does not belong to the user');
    }

    // Update the address
    await this.userAddressRepository.update(addressId, {
      address_line_1: updateUserAddressDto.address_line1,
      address_line_2: updateUserAddressDto.address_line2,
      city: updateUserAddressDto.city,
      state: updateUserAddressDto.state,
      postal_code: updateUserAddressDto.postal_code,
      country_id: updateUserAddressDto.country_id,
      is_default: updateUserAddressDto.is_default || false,
      is_billing_default: updateUserAddressDto.is_billing_default || false,
      is_shipping_default: updateUserAddressDto.is_shipping_default || false,
    });

    // Return the updated address
    const updatedAddress = await this.userAddressRepository.findOne({
      where: { id: addressId },
      relations: ['country']
    });

    if (!updatedAddress) {
      throw new NotFoundException('Address not found after update');
    }

    return updatedAddress;
  }
}
