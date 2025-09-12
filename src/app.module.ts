import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    // OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
