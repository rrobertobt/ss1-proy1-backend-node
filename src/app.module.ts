import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { GenreModule } from './genres/genres.module';
import { AnalogArticlesModule } from './analog-articles/analog-articles.module';
import { CartModule } from './cart/cart.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    ArtistsModule,
    GenreModule,
    AnalogArticlesModule,
    CartModule,
    CommonModule
    // OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
