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
  resend:number=0;
  sendSms=false;
  show_login = true;
  login_is_hide = false
  animation_class: string='';
  login_animation_class: string='';
  first = true;
  error = '';
  onSubmit= false;
  sms_id:any;
  sec:number;
  counter:any;
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
  
  authCode:any = ''
  mobile:any = ''
  
  send(){
    this.onSubmit = true;
    let body = {mobile:this.englishNumber.transform(this.mobile)};
    this.http.sendSms(body).subscribe({
      next:(data:any)=>{
        this.sms_id = data.id
        this.onSubmit = false;
        this.sendSms = true;
        this.sec = 180;
        this.counter = setInterval(()=>{
          if(this.sec == 0)
            clearInterval(this.counter);
        this.sec--;
        
        },1000);
        },
      error:(err)=>{
        this.onSubmit = false
        this.error = 'شماره وارد شده فاقد اعتبار است'
      },
    })
  }
  submit(){
    if (this.authCode){
      this.onSubmit = true;
      let code = this.englishNumber.transform(this.authCode);
      let body = {code:code, id:this.sms_id};
      this.http.login(body).subscribe({
        next:(data:any)=>{
          this.error = '';
          localStorage.setItem('permission',JSON.stringify(data.permission));
          localStorage.setItem('token',data.token.toString());
          this.router.navigate(['/panel']);
          this.onSubmit = false;
        },
        error:(err)=>{
          this.onSubmit = false
          this.error = 'کد وارد شده اشتباه است'
        }
      })
    }
  }
  
  
  protected readonly Date = Date;
}
