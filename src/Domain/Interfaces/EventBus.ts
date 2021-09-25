import { DomainEventMapping } from '../../Infrastructure/EventBus/DomainEventMapping';
import { DomainEvent } from '../ValueObjects/DomainEvent';
import { DomainEventSubscriber } from '../Interfaces/DomainEventSubscriber';

export interface EventBus {
  setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
  start(): Promise<void>;
}
