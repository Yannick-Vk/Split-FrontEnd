export interface User {
    id: number;
    username: string;
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

export interface Split {
    id: number;
    user: User;
    payer: User;
}