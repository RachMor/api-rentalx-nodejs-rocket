import 'express-async-errors';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swagger from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import { routes } from './routes';
import '../../container';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  });
});

export { app };
