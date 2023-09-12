export interface ChangePassword{
    user:any,
    oldPassword:string
    newPassword:string
}

export interface ForgotPassword{
    email:string,
    code:string,
    newPassword:string
}