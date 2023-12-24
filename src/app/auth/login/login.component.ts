import { Component, ViewEncapsulation } from '@angular/core';
import { of, tap } from "rxjs";
import { AuthHttpService } from "../../HttpServices/auth-http.service";
import { EnglishNumberPipe } from "../../shared/pipe/english-number.pipe";
import { PersianNumberPipe } from "../../shared/pipe/persian-number.pipe";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[EnglishNumberPipe, PersianNumberPipe],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent {
  show_login = true;
  login_is_hide = false
  animation_class: string='';
  login_animation_class: string='';
  first = true;
  error = '';
  onSubmit= false;
  constructor(
      private http:AuthHttpService,
      private englishNumber:EnglishNumberPipe,
      private router:Router
  ) {
  }

  toggle() {
    this.first = false;
    of(1).pipe(
      tap(i => this.show_login = !this.show_login),
      tap(i=>this.login_animation_class = ''),
      tap(i => this.login_is_hide = !this.show_login),
    ).subscribe()
  }

  change_animate(event:MouseEvent){
    this.animation_class = event.type == 'mouseenter' ? 'in' :
    event.type == 'mouseleave' ? 'out' : '';
  }
  change_animate_login(event:MouseEvent){
    this.login_animation_class = event.type == 'mouseenter'&&this.login_is_hide ? 'show_hover' :
    event.type == 'mouseleave'&&this.login_is_hide ? 'hide_hover' : '';
  }
  
  personal_code:any = ''
  submit(){
    // this.personal_code = this.englishNumber.transform(this.personal_code)
    if (this.personal_code){
      this.onSubmit = true
      let code = this.englishNumber.transform(this.personal_code)
      let body = {personal_code:code}
      this.http.login(body).subscribe({
        next:(data:any)=>{
          console.log(data.token)
          this.error = ''
          localStorage.setItem('permission',JSON.stringify(data.permission))
          localStorage.setItem('token',data.token.toString());
          this.router.navigate(['/panel'])
          this.onSubmit = false
        },
        error:(err)=>{
          this.onSubmit = false
          this.error = 'کاربر یافت نشد'
        }
      })
    }
  }


}
