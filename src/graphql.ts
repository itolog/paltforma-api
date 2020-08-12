
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserInput {
    name?: string;
    email?: string;
    avatar?: string;
    isAdmin?: boolean;
}

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    isAdmin?: boolean;
}

export interface IQuery {
    login(username: string, password: string): LoggedUser | Promise<LoggedUser>;
    user(name: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface LoggedUser {
    user: User;
    token: string;
}

export interface IMutation {
    createUser(createUserInput?: CreateUserInput): User | Promise<User>;
    updateUser(id: string, user?: UserInput): string | Promise<string>;
    deleteUser(id: string): string | Promise<string>;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    isAdmin?: boolean;
}
