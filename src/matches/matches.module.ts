import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SummonersService } from 'src/summoners/summoners.service';
import { Summoner } from 'src/summoners/entities/summoner.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Summoner]), HttpModule],
  controllers: [MatchesController],
  providers: [MatchesService, SummonersService],
})
export class MatchesModule {}
