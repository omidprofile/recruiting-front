import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, retry, throwError, timeout, timer } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
	newError: any;
	
	constructor(private route: Router) {
	}
	
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry(
				3,
			),
			catchError(err => {
				return throwError( () => {
					if (err.status == 400) {
						this.newError = {
							error: err,
							status: 400
						}
					} else if (err.status == 401) {
						this.newError = {
							message: err.error.message,
							status: 401
						}
						 this.route.navigate(['/auth/login'])
					} else if (err.status == 404)
						this.newError = {
							message: 'صفحه مورد نظر یافت نشد',
							status: 404
						}
					// return new Error('صفحه مورد نظر یافت نشد')
					else if (err.status == 403)
						this.newError = {
							message: err.error.message,
							status: 403
						}
					// return new Error(err.error.message)
					else if (err.status == 498)
						this.newError = {
							message: 'نشست شما منقضی شده است لطفا مجددا وارد شوید',
							status: 498
						}
					// return new Error('نشست شما منقضی شده است لطفا مجددا وارد شوید')
					else
						this.newError = {
							message: 'وجود خطا در اتصال اینترنتی شما لطفا مجددا سعی نمایید',
							status: 404
						}
					// return new Error('وجود مشکل در اتصال اینترنتی شما')
					return this.newError
				})
			})
		)
	}
}
