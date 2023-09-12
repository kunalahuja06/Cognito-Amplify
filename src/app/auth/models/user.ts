export interface User{
    name:string,
    password:string,
    email:string,
    updated_at:string,
    phone:string
}

export interface ConfirmSignup{
    username:string,
    code:string
}

export interface UserLogin{
    username:string,
    password:string
}