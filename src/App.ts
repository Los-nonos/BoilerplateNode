import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as errorHandler from './Infrastructure/ErrorHandler/errorHandler';
import DatabaseConnection from './Infrastructure/Persistence/DatabaseConnection';
import IndexApiRoutes from './Presentation/Http/Routes/index';
import DIContainer from './Infrastructure/DI/di.config';
import dotenv from 'dotenv';
import HttpKernel from "./Presentation/Http/Kernel";

class App {
  private app: Application;
  private apiRoutes: IndexApiRoutes;

  public constructor(express: Application) {
    this.app = express;
  }

  public async upServer() {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`Environment variables not configured, aborting`);
    }

    this.apiRoutes = DIContainer.resolve<IndexApiRoutes>(IndexApiRoutes);

    await this.setDatabaseConnection();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app = new HttpKernel().handle(this.app);
  }

  private setRoutes(): void {
    this.app.use('/v1', this.apiRoutes.getRoutes());
  }

  private catchErrors(): void {
    this.app.use(errorHandler.logErrors);
    this.app.use(errorHandler.mapApplicationToHTTPErrors);
    this.app.use(errorHandler.execute);
  }

  private async setDatabaseConnection(): Promise<void> {
    const dbConnection = new DatabaseConnection();
    await dbConnection.getConnection();
  }

  public getAppInstance(): Application {
    return this.app;
  }
}

export default App;
