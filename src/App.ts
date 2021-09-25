import DatabaseConnection from './Infrastructure/Persistence/DatabaseConnection';
import dotenv from 'dotenv';
import Server from './server';
import DIContainer from './Infrastructure/DI/di.config';
import { INTERFACES } from './Infrastructure/DI/interfaces.types';
import { SUBSCRIBERS } from './Infrastructure/DI/subscribers.ioc';
import { DomainEventMapping } from './Infrastructure/EventBus/DomainEventMapping';
import { EventBus } from './Domain/Interfaces/EventBus';

class App {
  private server?: Server;

  async start() {
    const result = dotenv.config();

    if (result.error) {
      throw result.error;
    }

    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await this.setDatabaseConnection();
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): string {
    if (!this.server) {
      throw new Error('Backoffice backend application has not been started');
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }

  private async setDatabaseConnection(): Promise<void> {
    const dbConnection = new DatabaseConnection();
    await dbConnection.getConnection();
  }

  private async registerSubscribers() {
    const eventBus = DIContainer.get(INTERFACES.EventBus) as EventBus;

    const domainEventMapping = new DomainEventMapping(SUBSCRIBERS);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(SUBSCRIBERS);
    await eventBus.start();
  }

  public getAppInstance(): Server {
    return this.server;
  }
}

export default App;
