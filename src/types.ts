export interface User {
    username: string;
    email: string;
}

export interface UserWithToken {
    UserName: string;
    Email: string;
    Jwt: string;
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
    receiver: User;
    payer: User;
    amount: number;
}