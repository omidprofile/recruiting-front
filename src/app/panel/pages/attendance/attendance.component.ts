import { Component } from '@angular/core';


const items = [
  {title:'حضور غیاب روزانه', logo:'daily', link:'daily',is_active:true,permission:['super-user','recruiting-admin','guard']},
  {title:'حضور غیاب روز های گذشته', logo:'last_days', link:'last-days',is_active:true,permission:['super-user','recruiting-admin','guard']},
  {title:'ثبت دستی', logo:'manual', link:'manual',is_active:true,permission:['super-user','recruiting-admin','guard']},
  // {title:'مغایرت', logo:'conflict', link:'conflict',is_active:false,permission:['super-user','recruiting-admin','guard']'},
  {title:'نیاز به بررسی', logo:'pending', link:'pending',is_active:true,permission:['super-user','recruiting-admin',]},
  {title:'تایید شده', logo:'accepted', link:'accepted',is_active:true,permission:['super-user','recruiting-admin','guard']},
  {title:'دستگاه ها', logo:'devices', link:'devices',is_active:true,permission:['super-user','recruiting-admin',]},

]
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  
  items:any
  ngOnInit() {
    this.items = items.sort((a,b)=>{
      return (a.is_active === b.is_active)? 0 : a.is_active? -1 : 1;
    })
  }
}
