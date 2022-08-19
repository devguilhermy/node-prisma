import express, { Request, Response } from 'express';
import { IUserInput } from './types';
import { PrismaClient } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { selectUserFields } from './utils';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const aa = prisma.user;

app.post('/users', async (req: Request, res: Response) => {
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
            ]),
        });

        res.json(newUser);
    } catch (error: any) {
        res.status(400).json({
            error: error,
        });
    }
});

app.get('/users', async (req: Request, res: Response) => {
    const userList = await prisma.user.findMany({
        select: selectUserFields([
            'id',
            'username',
            'name',
            'about',
            'createdAt',
        ]),
    });

    res.json(userList);
});

app.get('/users/:userId', async (req: Request, res: Response) => {
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
        ]),
    });

    res.json(user);
});

app.patch('/users/:userId', async (req: Request, res: Response) => {
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
        ]),
    });

    res.json(updatedUser);
});

app.delete('/users/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    res.json(true);
});

app.listen(3333, () => {
    console.log('SERVER RUNNING ON PORT 3333');
});
