
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    token: string;
    avatar?: string;
    isAdmin?: boolean;
}

export interface UpdateUserAvatarInput {
    id: string;
    url: string;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    registration(createUserInput?: CreateUserInput): User | Promise<User>;
    updateUserAvatar(updateUserAvatarInput?: UpdateUserAvatarInput): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
    avatar?: string;
    isAdmin?: boolean;
}
