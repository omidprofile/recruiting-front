import { Component } from '@angular/core';
const items = [
  {title:'گزارش ساز', logo:'report_maker', link:'reportMaker',is_active:true,permission:['super-user','recruiting-admin']},
  {title:'گزارشات', logo:'reports', link:'reports',is_active:true,permission:['super-user','recruiting-admin']},
  {title:'کسورات و اضافات', logo:'IncDec', link:'IncDec',is_active:true,permission:['super-user','']},
  // {title:'وام و مساعد', logo:'loan', link:'loan',is_active:true,permission:['super-user','']},
  // {title:'گزارش کارکرد', logo:'workReport', link:'workReport',is_active:true},
  // {title:'گزارش روزانه', logo:'workReport', link:'workInfo',is_active:true},
  // {title:'حقوق پرسنل', logo:'rights', link:'paySlip',is_active:true},
  // {title:'دریافتی پرسنل', logo:'receipt', link:'receipt',is_active:false},
  // {title:'اطلاعات پایه', logo:'baseInfo', link:'baseInfo', is_active:false},
  
]
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  items:any
  
  ngOnInit() {
    this.items = items.sort((a,b)=>{
      return (a.is_active === b.is_active)? 0 : a.is_active? -1 : 1;
    })
  }
}
