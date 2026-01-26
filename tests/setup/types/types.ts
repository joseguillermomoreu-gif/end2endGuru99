interface LoginUser {
    username: string;
    password: string;
}

export interface LoginUserCMS extends LoginUser {
    role: string;
}
