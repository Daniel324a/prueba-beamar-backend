import express, { urlencoded, json, static as expStatic } from 'express';

import Http from 'http';
import cors from 'cors';

import appointmentsRoutes from '../routes/appointments';

import { dbConnection } from '../database/config';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = Http.createServer(this.app);

    this.paths = {
      appointments: '/api/appointments',
    };

    // BD Connecion Chain
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Api Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: '*',
      })
    );

    // Request's Read & Parse
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
    // Public Dir
    this.app.use(expStatic('public'));
  }

  routes() {
    this.app.use(this.paths.appointments, appointmentsRoutes);
  }

  listen() {
    this.server.listen(this.port, () => console.log('Server Running on:', this.port));
  }
}
