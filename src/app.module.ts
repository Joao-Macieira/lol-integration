import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SummonersModule } from './summoners/summoners.module';
import { MatchesModule } from './matches/matches.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore.redisStore as unknown as CacheStore,
      url: process.env.REDIS_URL,
      ttl: 60 * 25, // 25 minutes
      isGlobal: true,
    }),
    DatabaseModule,
    SummonersModule,
    MatchesModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
