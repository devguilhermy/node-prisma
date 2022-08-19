import express from 'express';
import { PostController } from '../controllers/PostController';

const PostRouter = express.Router();

PostRouter.post('/', PostController.createPost);
PostRouter.post('/many', PostController.createManyPosts);
PostRouter.get('/', PostController.listPosts);
PostRouter.get('/:postId', PostController.showPost);
PostRouter.patch('/:postId', PostController.updatePost);
PostRouter.delete('/:postId', PostController.deletePost);

export { PostRouter };
