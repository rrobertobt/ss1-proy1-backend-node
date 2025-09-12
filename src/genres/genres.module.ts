import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenreService } from './services/genre.service';
import { GenreController } from './controllers/genre.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}