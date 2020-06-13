import { Redis } from 'ioredis';

export interface ICacheConnection {
  getConnection(): Redis;
}
