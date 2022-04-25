import express from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config.js';
import errorHandler from './middleware/errorHandler.js';
import stackRouter from './stack/stack.routes.js';
import keyValueRouter from './key-value/key-value.routes.js';

const { server: { port } } = config;
const app = express();

app.use(express.json());

app.use('/stack', stackRouter);
app.use('/keyValue', keyValueRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
