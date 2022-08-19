import express from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = express.Router();

UserRouter.post('/', UserController.createUser);
UserRouter.post('/many', UserController.createManyUsers);
UserRouter.get('/', UserController.listUsers);
UserRouter.get('/:userId', UserController.showUser);
UserRouter.patch('/:userId', UserController.updateUser);
UserRouter.delete('/:userId', UserController.deleteUser);

export { UserRouter };
