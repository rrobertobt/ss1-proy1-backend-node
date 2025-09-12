import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalogArticleController } from './controllers/analog-article.controller';
import { AnalogArticleService } from './services/analog-article.service';
import { AnalogArticle } from './entities/analog-article.entity';
import { Cd } from './entities/cd.entity';
import { Vinyl } from './entities/vinyl.entity';
import { Cassette } from './entities/cassette.entity';
import { Currency } from '../common/entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalogArticle,
      Cd,
      Vinyl,
      Cassette,
      Currency,
    ]),
  ],
  controllers: [AnalogArticleController],
  providers: [AnalogArticleService],
  exports: [AnalogArticleService],
})
export class AnalogArticlesModule {}