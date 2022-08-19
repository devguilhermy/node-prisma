import express, { Request, Response } from 'express';
import { IUserInput } from './types';
import { mainRouter } from './routes';
import { PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { selectUserFields } from './utils';
import { UserRouter } from './routes/UserRoutes';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.listen(3333, () => {
    console.log('SERVER RUNNING ON PORT 3333');
});

app.use('/', mainRouter);

export { app, prisma };
