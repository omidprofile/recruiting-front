import {Component, OnInit} from '@angular/core';

const items = [
  {title:'افزودن کاربر', logo:'adduser', link:'create',is_active:true},
  {title:'لیست کاربران', logo:'usersList', link:'list',is_active:true},
  {title:'نقش ها', logo:'chart', link:'',is_active:false},
]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  items:any
  ngOnInit() {
    this.items = items.sort((a,b)=>{
      return (a.is_active === b.is_active)? 0 : a.is_active? -1 : 1;
  })
  }

}
