import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userloginParams:UserLogin
  login: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),]),
  });

  constructor(private authService:AuthService, private readonly notificationService:NotificationService, private router:Router) {}

  async onSubmit():Promise<void>{
    if (this.login.valid) {
      this.userloginParams=this.mapUser()
      const response = await this.authService.login(this.userloginParams)
      if(response?.username){
        window.localStorage.setItem('access_token',response?.signInUserSession?.accessToken?.jwtToken)
        this.notificationService.success("login success")
        this.router.navigate(['/'])
      }
      if(response?.code){
        console.log
        if(response?.code === 'NotAuthorizedException'){
          this.notificationService.error(response?.message)
        }
        else if(response?.code === 'UserNotConfirmedException'){
          this.notificationService.error('User is not verified. Please verify user')
        }
        else{
          this.notificationService.error("error in signing in")
        }
      }
      this.login.reset();
    }
  }

  mapUser():UserLogin{
    return{
      username:this.login.get('username').value,
      password:this.login.get('password').value
    }
  }
}
