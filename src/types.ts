export interface IUser {
    id: string;
    username: string;
    password: string;
    name: string;
    about: string;
    createdAt: string;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt'>;
