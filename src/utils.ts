import { Prisma } from '@prisma/client';

export const selectUserFields = (
    list: (keyof Prisma.UserSelect)[]
): Prisma.UserSelect => {
    const object: { [index: string]: boolean } = {};

    list.forEach((item) => {
        object[item] = true;
    });

    return object;
};
