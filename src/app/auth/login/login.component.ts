import {Component} from '@angular/core';
import {delay, first, of, tap} from "rxjs";
import {animation} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show_login = true;
  login_is_hide = false
  animation_class: string='';
  login_animation_class: string='';
  first = true;

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


}
