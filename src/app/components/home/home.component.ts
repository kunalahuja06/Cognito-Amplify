import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userInfo:any

  constructor(private authService:AuthService, private readonly router:Router) {
    this.getUserInfo()
  }

  async getUserInfo():Promise<void>{
    let response = await this.authService.GetCurrentUser();
    if(response?.attributes){
      this.userInfo = response?.attributes
    }
  }

  async logout():Promise<void>{
    this.authService.logout();
  }
}
