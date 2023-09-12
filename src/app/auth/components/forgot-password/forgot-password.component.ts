import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ForgotPassword } from '../../models/password';
import { Router } from '@angular/router';
import {
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../utils/password';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  sendCodeSuccess: boolean = false;
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      passwordStrengthValidator(),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.newPasswordForm.setValidators(passwordMatchValidator());
  }

  async sendCode() {
    if (this.forgotPasswordForm.valid) {
      let email = this.forgotPasswordForm.get('email').value;
      const response = await this.authService.forgotPassword(email);
      if (response?.code) {
        this.notificationService.error(response?.message);
      } else {
        this.notificationService.success('Verification Code Sent');
        setTimeout(() => {
          this.sendCodeSuccess = true;
        }, 1000);
      }
    }
  }

  async setNewPassword() {
    if (this.newPasswordForm.valid) {
      let newPasswordParams: ForgotPassword = this.mapUser();
      const response = await this.authService.forgotPasswordSubmit(
        newPasswordParams
      );
      if (response === 'SUCCESS') {
        this.notificationService.success(
          'Password reset successful. Please Log in'
        );
        this.sendCodeSuccess = false;
        this.newPasswordForm.reset();
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1000);
      } else {
        if (response?.code === 'CodeMismatchException') {
          this.notificationService.error(response?.message);
        }
      }
    }
  }

  mapUser(): ForgotPassword {
    return {
      email: this.forgotPasswordForm.get('email').value,
      code: this.newPasswordForm.get('code').value,
      newPassword: this.newPasswordForm.get('password').value,
    };
  }
}
