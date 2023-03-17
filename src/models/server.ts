import express, { Application } from 'express';
import cors from 'cors';
import routerTask from '../routes/task.routes';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { options } from '../swaggerOptions';
import swaggerJSDoc from 'swagger-jsdoc';

class Server {
  private specs = swaggerJSDoc(options);
  private app: Application;
  private port: string | undefined;
  private taskRoutesPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.taskRoutesPath = '/api/tasks';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  private middlewares() {
    // CORS
    this.app.use(cors());

    this.app.use(morgan('dev'));

    // Public directory
    // this.app.use(express.static('public'));

    // Parse and read body
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(this.taskRoutesPath, routerTask);
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.specs));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
