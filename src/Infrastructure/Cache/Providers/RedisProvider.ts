import { ICacheService } from '../../../Domain/Interfaces/Services/ICacheService';
import { inject, injectable } from 'inversify';
import { Redis } from 'ioredis';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import { ICacheConnection } from '../../Cache/ICacheConnection';

@injectable()
export class RedisProvider implements ICacheService {
  private connection: Redis;
  public constructor(@inject(INTERFACES.IRedisConnection) redisConnection: ICacheConnection) {
    this.connection = redisConnection.getConnection();
  }

  public async deleteKey(key: string): Promise<number> {
    return await this.connection.del(key);
  }
  public async getString(key: string): Promise<string | number | null> {
    return await this.connection.get(key);
  }
  public async incrementCount(key: string): Promise<number> {
    return await this.connection.incr(key);
  }
  public async incrementCountBy(key: string, increment: number): Promise<number> {
    return await this.connection.incrby(key, increment);
  }
  public async setString(key: string, value: string): Promise<any> {
    return await this.connection.set(key, value);
  }
  public async addToSet(key: string, member: string | number, ...members: (string | number)[]): Promise<number> {
    return await this.connection.sadd(key, member, ...members);
  }
  public async removeFromSet(key: string, member: string | number, ...members: (string | number)[]): Promise<number> {
    return await this.connection.srem(key, member, ...members);
  }
  public async getAllMembersFromSet(key: string): Promise<string[]> {
    return await this.connection.smembers(key);
  }
  public async getRandomMemberFromSet(key: string, count?: number): Promise<any> {
    return await this.connection.srandmember(key, count);
  }
  public async isMemberOfSet(key: string, member: string): Promise<number> {
    return await this.connection.sismember(key, member);
  }

  public async deleteHash(key: string, field: string, ...fields: string[]): Promise<number> {
    return await this.connection.hdel(key, field, ...fields);
  }
  public async existsInHash(key: string, field: string): Promise<number> {
    return await this.connection.hexists(key, field);
  }
  public async getFromHash(key: string, field: string): Promise<string | null> {
    return await this.connection.hget(key, field);
  }
  public async getAllFromHash(key: string): Promise<{ [propName: string]: string }> {
    return await this.connection.hgetall(key);
  }
  public async setHash(key: string, field: string, value: string | number): Promise<0 | 1> {
    return await this.connection.hset(key, field, value);
  }
}
