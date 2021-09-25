import { DomainEvent, DomainEventClass } from '../ValueObjects/DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;

  on(domainEvent: T): Promise<void>;
}
