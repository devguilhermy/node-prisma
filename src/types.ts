export interface IUser {
    id: string;
    username: string;
    password: string;
    name: string;
    about: string;
    createdAt: string;
    updatedAt: string;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export interface IPost {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    user?: IUser;
}

export type IPostInput = Omit<IPost, 'id' | 'createdAt' | 'updatedAt' | 'user'>;
