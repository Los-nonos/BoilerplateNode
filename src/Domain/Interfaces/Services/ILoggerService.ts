import { LogLevels } from '../../Enums/LogLevels';

export interface ILoggerService {
  log(level: LogLevels, message: string): void;

  error(error: Error): void;
}
