import RedisClient, { Redis } from 'ioredis';
import { injectable } from 'inversify';
import { ICacheConnection } from './ICacheConnection';
import { config } from '../../config/config';

@injectable()
export default class CacheConnection implements ICacheConnection {
  private connection: Redis;

  public constructor() {
    this.connection = new RedisClient({
      host: config('redis.host'),
      port: Number(config('redis.port')),
    });
  }
  public getConnection(): Redis {
    return this.connection;
  }
}
