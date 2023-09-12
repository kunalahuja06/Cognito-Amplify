import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChangePassword } from '../../models/password';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import {
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../utils/password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordStrengthValidator(),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {
    this.changePasswordForm.setValidators(passwordMatchValidator());
  }

  async onSubmit() {
    await this.changePassword();
    this.changePasswordForm.reset();
  }

  async changePassword() {
    let changePasswordParams: ChangePassword = {
      oldPassword: this.changePasswordForm.get('oldPassword').value,
      newPassword: this.changePasswordForm.get('password').value,
      user: '',
    };
    const response = await this.authService.changePassword(
      changePasswordParams
    );
    if (response === 'SUCCESS') {
      this.notificationService.success('Password changed Successfully');
      this.authService.logout();
    } else {
      if (response?.code === 'NotAuthorizedException') {
        this.notificationService.error(response?.message);
      } else {
        this.notificationService.error('error in changing password');
      }
    }
  }
}
