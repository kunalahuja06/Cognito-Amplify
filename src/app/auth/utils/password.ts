import { FormControl, AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordStrengthValidator = () => {
    return (control: FormControl) => {
      const password = control.value;

      // Define regular expressions for each required character type
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const digitRegex = /\d/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

      // Check if the password meets the criteria
      const hasLowercase = lowercaseRegex.test(password);
      const hasUppercase = uppercaseRegex.test(password);
      const hasDigit = digitRegex.test(password);
      const hasSpecialChar = specialCharRegex.test(password);

      // Calculate the strength score based on the criteria met
      const strengthScore =
        (hasLowercase ? 1 : 0) +
        (hasUppercase ? 1 : 0) +
        (hasDigit ? 1 : 0) +
        (hasSpecialChar ? 1 : 0);

      // Determine if the password meets the required strength (all four character types)
      if (strengthScore >= 4) {
        return null; // Password meets the criteria
      } else {
        return { passwordStrength: true }; // Password does not meet the criteria
      }
    };
  }

export const passwordMatchValidator = () => {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password').value;
      const confirmPassword = control.get('confirmPassword').value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

