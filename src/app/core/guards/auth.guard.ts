import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  return isAuthenticated();
};

const isAuthenticated=async ()=>{
  const authService:AuthService = inject(AuthService)
  const router:Router = inject(Router)

  const currentSession = await authService.GetCurrentSession();

  if (currentSession != null) {
    localStorage.setItem('access_token', currentSession.getIdToken().getJwtToken());
    return true;
  }

  localStorage.removeItem('access_token');
  router.navigate(['/auth/login']);
  return false;
}
