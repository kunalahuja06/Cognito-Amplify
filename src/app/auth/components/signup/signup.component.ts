import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmSignup, User } from '../../models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import {
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../utils/password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  user: User;
  signupSuccess: boolean = false;

  signup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?\d{1,3}?[ -]?\d{10}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      passwordStrengthValidator(),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  verificationForm: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {
    this.signup.setValidators(passwordMatchValidator());
  }

  async onSubmit(): Promise<void> {
    if (this.signup.valid) {
      let signUpUser = this.mapUser();
      const response = await this.authService.signUp(signUpUser);
      if (response?.user) {
        this.signupSuccess = true;
        this.notificationService.success(
          'Signup successful, Verification code sent.'
        );
      } else {
        if (response?.code === 'UsernameExistsException') {
          this.notificationService.error(response.message);
        } else {
          this.notificationService.error('Error in signing up');
        }
      }
    }
  }

  mapUser(): User {
    return {
      name: this.signup.get('name').value,
      password: this.signup.get('password').value,
      updated_at: Date.now().toString(),
      email: this.signup.get('email').value,
      phone: this.signup.get('phoneNumber').value,
    };
  }

  async verifyCode(): Promise<void> {
    let confirmSignupParams: ConfirmSignup = {
      username: this.signup.get('email').value,
      code: this.verificationForm.get('code').value,
    };
    const response = await this.authService.verifyUser(confirmSignupParams);
    if (response?.code) {
      if (response?.code === 'CodeMismatchException') {
        this.notificationService.error(response?.message);
      }
    } else {
      this.notificationService.success(
        'Verification successful. Please Log in'
      );
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    }
  }

  async resendCode() {
    let userName = this.signup.get('email').value;
    await this.authService.resendCode(userName);
    this.notificationService.success('Verification code sent');
  }
}
