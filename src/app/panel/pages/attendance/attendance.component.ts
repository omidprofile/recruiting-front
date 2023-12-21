import { Component } from '@angular/core';


const items = [
  {title:'حضور غیاب روزانه', logo:'daily', link:'daily',is_active:true},
  {title:'ثبت دستی', logo:'manual', link:'manual',is_active:true},
  {title:'مغایرت', logo:'conflict', link:'conflict',is_active:true},
  {title:'در حال بررسی', logo:'pending', link:'pending',is_active:false},
  {title:'تایید شده', logo:'accepted', link:'accepted',is_active:true},
  {title:'دستگاه ها', logo:'devices', link:'devices',is_active:true},

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
