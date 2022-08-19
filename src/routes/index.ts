import express from 'express';
import { PostRouter } from './PostRoutes';
import { UserRouter } from './UserRoutes';

const mainRouter = express.Router();

mainRouter.use('/users', UserRouter);
mainRouter.use('/posts', PostRouter);

export { mainRouter };
