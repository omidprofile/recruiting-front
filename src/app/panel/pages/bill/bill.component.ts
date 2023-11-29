import { Component } from '@angular/core';
const items = [
  {title:'کارکرد پرسنل', logo:'workReport', link:'workReport',is_active:true},
  {title:'حقوق پرسنل', logo:'rights', link:'rights',is_active:false},
  {title:'دریافتی پرسنل', logo:'receipt', link:'receipt',is_active:false},
  {title:'اطلاعات پایه', logo:'baseInfo', link:'baseInfo', is_active:false},
  
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
