import express, { Application } from 'express';
import cors from 'cors';
import routerTask from '../routes/task.routes';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { options } from '../swaggerOptions';
import swaggerJSDoc from 'swagger-jsdoc';
import routerUser from '../routes/user.routes';
import routerAuth from '../routes/auth.routes';

class Server {
  private specs = swaggerJSDoc(options);
  private app: Application;
  private port: string | undefined;
  private tasksRoutesPath: string;
  private usersRoutesPath: string;
  private authRoutesPath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.tasksRoutesPath = '/v1/api/tasks';
    this.usersRoutesPath = '/v1/api/users';
    this.authRoutesPath = '/v1/api/auth';

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
    this.app.use(this.tasksRoutesPath, routerTask);
    this.app.use(this.usersRoutesPath, routerUser);
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.specs));
    this.app.use(this.authRoutesPath, routerAuth);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
