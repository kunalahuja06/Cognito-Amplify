import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuard } from '../core/guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'auth/change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path:'auth/reset-password',
    component:ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule
  ],
  exports:[RouterModule]
})
export class AuthModule { }
