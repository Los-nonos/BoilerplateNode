import {LoggerService} from "../../../Domain/Interfaces/Services/LoggerService";
import {LogLevels} from "../../../Domain/Enums/LogLevels";

import { createLogger, format, Logger, transports } from 'winston';
import Sentry from 'winston-sentry-log';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import SlackHook from 'winston-slack-webhook-transport';
import {injectable} from "inversify";

@injectable()
export default class WinstonLoggerService implements LoggerService {
  private logger: Logger;
  private readonly logFormatCommon = format.printf(function (info): string {
    const date = new Date().toISOString();
    return `[${date}] [${info.level}]: ${info.message}`;
  });
  private readonly logFormatSlack = (info): object => {
    const date = new Date().toISOString();
    let body = '';
    try {
      body = `\`\`\` ${JSON.stringify(JSON.parse(info.message), null, 2)} \`\`\``;
    } catch {
      body = `\`\`\` ${info.message} \`\`\``;
    }
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: `Log object at ${date}, ${info.level}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: body,
          },
        },
      ],
    };
  };

  public constructor() {
    this.logger = createLogger({
      format: this.logFormatCommon,
      defaultMeta: {service: 'user-service'},
      transports: [
        //
        // - Write to all loggers with level `info` and below to `combined.logger`
        // - Write all loggers error (and below) to `error.logger`.
        //
        new transports.File({filename: 'logs/error.log', level: 'error'}),
        new transports.File({filename: 'logs/info.log'}),
      ],
    });
    if (process.env.SLACK_WEBHOOK && process.env.NODE_ENV == 'production') {
      this.logger.add(
        new SlackHook({
          webhookUrl: process.env.SLACK_WEBHOOK,
          formatter: this.logFormatSlack,
        }),
      );
    }

    //
    // If we're not in production then logger to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: this.logFormatCommon,
        }),
      );
    } else {
      if (process.env.SENTRY_DSN) {
        this.logger.add(new Sentry({dsn: process.env.SENTRY_DSN, level: 'info'}));
      }
    }
  }

  public log(level: LogLevels, message: string): void {
    this.logger.log(level, message);
  }

  public error(error: Error): void {
    this.logger.error(error);
  }
}