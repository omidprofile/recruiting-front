import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

export const getTokenGuard: CanActivateFn = (route, state) => {
	let token = localStorage.getItem('token') ?? ''
	if (token?.length && !(inject(JwtHelperService).isTokenExpired(token))){
		inject(Router).navigate(
			['/panel']
		)
		return false
	}
	
	return true
};
