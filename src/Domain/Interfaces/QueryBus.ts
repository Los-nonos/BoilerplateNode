import { Query } from '../ValueObjects/Query';
import { Response } from '../ValueObjects/Response';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}
