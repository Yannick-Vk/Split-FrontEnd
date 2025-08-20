export interface User {
    username: string;
    email: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserRegister {
    email: string;
    username: string;
    password: string;
}

export interface Split {
    user: User;
    payer: User;
}