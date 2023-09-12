import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { ConfirmSignup, User, UserLogin } from '../models/user';
import { ChangePassword, ForgotPassword } from '../models/password';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router:Router) {}

  async signUp(user: User) {
    try {
      const response = await Auth.signUp({
        password: user.password,
        username: user.email,
        attributes: {
          name: user.name,
          email: user.email,
          updated_at: user.updated_at,
          phone_number: user.phone,
        },
      });
      return response;
    } catch (error: any) {
      return error;
    }
  }

  async verifyUser(confirmSignupParams: ConfirmSignup) {
    try {
      await Auth.confirmSignUp(
        confirmSignupParams.username,
        confirmSignupParams.code
      );
    } catch (error: any) {
      return error;
    }
  }

  async resendCode(userName: string) {
    try {
      await Auth.resendSignUp(userName);
    } catch (error: any) {
      return error;
    }
  }

  async login(loginParams: UserLogin) {
    try {
      const user = await Auth.signIn({
        username: loginParams.username,
        password: loginParams.password,
      });
      return user;
    } catch (error: any) {
      return error;
    }
  }

  async GetCurrentSession(): Promise<any> {
    try {
      const response = await Auth.currentSession();
      return response;
    } catch (error: any) {
      return null;
    }
  }

  async GetCurrentUser(): Promise<any> {
    try {
      const response = await Auth.currentAuthenticatedUser();
      return response;
    } catch (error: any) {
      return null;
    }
  }

  async logout(){
    try {
      await Auth.signOut({ global: true });
      this.router.navigate(['/auth/login'])
      window.localStorage.removeItem('access_token')
    } catch (error:any) {
      return error
    }
  }

  async changePassword(changePasswordParams:ChangePassword){
    try {
      const user = await Auth.currentAuthenticatedUser();
      changePasswordParams.user = user
      const response = await Auth.changePassword(changePasswordParams.user,changePasswordParams.oldPassword,changePasswordParams.newPassword)
      return response
    } catch (error:any) {
      return error; 
    }
  }

  async forgotPassword(email:string){
    try {
      const response = await Auth.forgotPassword(email);
      return response;
    } catch (error:any) {
      return error
    }
  }

  async forgotPasswordSubmit(params:ForgotPassword){
    try {
      const response = await Auth.forgotPasswordSubmit(params.email, params.code, params.newPassword);
      return response
    } catch (error:any) {
      return error
    }
  }
}
