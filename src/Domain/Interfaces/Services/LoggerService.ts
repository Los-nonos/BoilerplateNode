enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info'
}

export interface LoggerService {
  log(level: Levels, message: string): void;
  debug(message: string): void;
  info(message: string): void;
  error(error: Error): void;
}
