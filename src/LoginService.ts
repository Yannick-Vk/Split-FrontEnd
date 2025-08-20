import type {LoginUser, User} from "./types.ts";
import * as z from 'zod'

let LoggedInUser: User;

export async function Login(userLogin: LoginUser | null | undefined): Promise<void> {
    let user = LoginUserToUser(userLogin);
    if (!user) {
        console.error("User not found");
        return;
    }
    LoggedInUser = user;
    console.log(LoggedInUser);
}

function LoginUserToUser(user: LoginUser | null | undefined): User | null {
    if (user) {
        let u = {username: "", email: "", id: 0};
        if (z.email(user.username)) {
            u.email = user.username;
            return u;
        } else {
            u.username = user.username;
        }
    }
    return null;
}