import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminCatalogController } from './controllers/admin-catalog.controller';
import { CatalogController } from './controllers/catalog.controller';
import { AnalogArticleService } from './services/analog-article.service';
import { VinylCategoryService } from './services/vinyl-category.service';
import { VinylSpecialEditionService } from './services/vinyl-special-edition.service';
import { CassetteCategoryService } from './services/cassette-category.service';
import { AnalogArticle } from './entities/analog-article.entity';
import { Cd } from './entities/cd.entity';
import { Vinyl } from './entities/vinyl.entity';
import { Cassette } from './entities/cassette.entity';
import { VinylCategory } from './entities/vinyl-category.entity';
import { VinylSpecialEdition } from './entities/vinyl-special-edition.entity';
import { CassetteCategory } from './entities/cassette-category.entity';
import { Currency } from '../common/entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnalogArticle,
      Cd,
      Vinyl,
      Cassette,
      VinylCategory,
      VinylSpecialEdition,
      CassetteCategory,
      Currency,
    ]),
  ],
  controllers: [AdminCatalogController, CatalogController],
  providers: [
    AnalogArticleService,
    VinylCategoryService,
    VinylSpecialEditionService,
    CassetteCategoryService,
  ],
  exports: [AnalogArticleService],
})
export class AnalogArticlesModule {}