import { IPost, IPostInput } from '../types';
import { prisma } from '..';
import { Request, Response } from 'express';
import { selectPostFields, selectUserFields } from '../utils';

export const PostController = {
    createPost: async (req: Request, res: Response) => {
        const postData: IPostInput = req.body;

        const newPost = await prisma.post.create({
            data: postData,
        });

        res.json(newPost);
    },

    createManyPosts: async (req: Request, res: Response) => {
        const postsData: IPostInput[] = req.body;

        const newPosts = await prisma.post.createMany({
            data: postsData,
        });

        res.json(newPosts);
    },

    listPosts: async (req: Request, res: Response) => {
        const postList = await prisma.post.findMany({
            select: selectPostFields(['id', 'title', 'body', 'createdAt']),
        });

        res.json(postList);
    },

    showPost: async (req: Request, res: Response) => {
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                ...selectPostFields([
                    'id',
                    'title',
                    'body',
                    'createdAt',
                    'updatedAt',
                ]),
                user: { select: selectUserFields(['id', 'username', 'name']) },
            },
        });

        res.json(post);
    },

    updatePost: async (req: Request, res: Response) => {
        const { postId } = req.params;
        const postData: Partial<IPostInput> = req.body;

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: postData,
            select: {
                ...selectPostFields([
                    'id',
                    'title',
                    'body',
                    'createdAt',
                    'updatedAt',
                ]),
                user: { select: selectUserFields(['id', 'username', 'name']) },
            },
        });

        res.json(updatedPost);
    },

    deletePost: async (req: Request, res: Response) => {
        const { postId } = req.params;

        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        res.json(true);
    },
};
