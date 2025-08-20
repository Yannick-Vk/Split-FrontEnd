export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    username: string;
    password: string;
}