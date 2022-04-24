import express from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config.js';
import errorHandler from './middleware/errorHandler.js';

const PORT = config.server.port;
const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
