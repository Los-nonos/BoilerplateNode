import { DomainEvent } from '../../../../Domain/ValueObjects/DomainEvent';
import { DomainEventSubscriber } from '../../../../Domain/Interfaces/DomainEventSubscriber';
import { EventBus } from '../../../../Domain/Interfaces/EventBus';
import { DomainEventMapping } from '../../DomainEventMapping';
import { EventEmitterBus } from '../../EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async start(): Promise<void> {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {}
}
