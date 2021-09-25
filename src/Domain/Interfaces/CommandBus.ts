import { Command } from '../ValueObjects/Command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
