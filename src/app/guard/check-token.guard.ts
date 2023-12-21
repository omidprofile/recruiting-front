import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject, Inject } from "@angular/core";

export const checkTokenGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('token')??''
  if (!token?.length || inject(JwtHelperService).isTokenExpired(token)){
    inject(Router).navigate(
        ['/auth/login']
    )
    return false
  }
  return true
};
