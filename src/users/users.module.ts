import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Gender } from './entities/gender.entity';
import { UserService } from './users.service';
import { GenderService } from './services/gender.service';
import { UsersController } from './users.controller';
import { GenderController } from './controllers/gender.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gender])],
  controllers: [UsersController, GenderController],
  providers: [UserService, GenderService],
  exports: [UserService],
})
export class UsersModule {}
