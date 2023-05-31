import { Module } from '@nestjs/common';
import { SummonersService } from './summoners.service';
import { SummonersController } from './summoners.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Summoner } from './entities/summoner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Summoner]), HttpModule],
  controllers: [SummonersController],
  providers: [SummonersService],
})
export class SummonersModule {}
