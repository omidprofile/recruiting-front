import { Injectable, signal } from '@angular/core';
import {MatDrawerMode} from "@angular/material/sidenav";

@Injectable({
  providedIn: 'root'
})
export class ToggleSidenavService {
 toggle_mini = signal<boolean>(false);
 toggle_max = signal<boolean>(false);
 toggle_type = signal<MatDrawerMode>('side');
  constructor() { }
  toggle_sidenav(width:number){
   if (width >= 992){
     this.toggle_mini.update(()=>!this.toggle_mini());
     this.toggle_max.update(()=> false);
     let state = this.toggle_mini()?'true':'false'
     localStorage.setItem('last_sidenav_state',state.toString());
   }
   else {
     this.toggle_max.update(()=>false);
     this.toggle_mini.update(()=>!this.toggle_mini());
}
  }

  setFirst(index:string){
   if (index == 'lg'){
     this.toggle_type.update(()=> 'side');
     this.toggle_mini.update(()=>true);
     let state = localStorage.getItem('last_sidenav_state')
     this.toggle_mini.update(()=> state == 'true');
   }
   if (index == 'sm'){
     this.toggle_type.update(()=> 'push');
     this.toggle_mini.update(()=>false);
     this.toggle_max.update(()=>true);
   }
  }
}
