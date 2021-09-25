import { DomainEventSubscriber } from "../../Domain/Interfaces/DomainEventSubscriber";
import { DomainEvent } from "../../Domain/ValueObjects/DomainEvent";

export const SUBSCRIBERS: Array<DomainEventSubscriber<DomainEvent>> = [];