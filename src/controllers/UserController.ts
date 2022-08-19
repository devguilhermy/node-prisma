import { IUserInput } from '../types';
import { prisma } from '..';
import { Request, Response } from 'express';
import { selectUserFields } from '../utils';

export const UserController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const userData: IUserInput = req.body;

            const newUser = await prisma.user.create({
                data: userData,
                select: selectUserFields([
                    'id',
                    'username',
                    'name',
                    'about',
                    'createdAt',
                    'posts',
                ]),
            });

            res.json(newUser);
        } catch (error: any) {
            res.status(400).json({
                error: error,
            });
        }
    },

    createManyUsers: async (req: Request, res: Response) => {
        try {
            const usersData: IUserInput[] = req.body;

            const newUsers = await prisma.user.createMany({
                data: usersData,
            });

            res.json(newUsers);
        } catch (error: any) {
            res.status(400).json({
                error: error,
            });
        }
    },

    listUsers: async (req: Request, res: Response) => {
        const userList = await prisma.user.findMany({
            select: selectUserFields([
                'id',
                'username',
                'name',
                'about',
                'createdAt',
                'posts',
            ]),
        });

        res.json(userList);
    },

    showUser: async (req: Request, res: Response) => {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: selectUserFields([
                'id',
                'username',
                'name',
                'about',
                'createdAt',
                'posts',
            ]),
        });

        res.json(user);
    },

    updateUser: async (req: Request, res: Response) => {
        const { userId } = req.params;
        const userData: Partial<IUserInput> = req.body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: userData,
            select: selectUserFields([
                'id',
                'username',
                'name',
                'about',
                'createdAt',
                'posts',
            ]),
        });

        res.json(updatedUser);
    },

    deleteUser: async (req: Request, res: Response) => {
        const { userId } = req.params;

        await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        res.json(true);
    },
};
