import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Currency } from './entities/currency.entity';
import { CountriesController } from './controllers/countries.controller';
import { CurrenciesController } from './controllers/currencies.controller';
import { CountriesService } from './services/countries.service';
import { CurrenciesService } from './services/currencies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Currency])],
  controllers: [CountriesController, CurrenciesController],
  providers: [CountriesService, CurrenciesService],
  exports: [CountriesService, CurrenciesService, TypeOrmModule],
})
export class CommonModule {}