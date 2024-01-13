import {Component, OnInit, ViewEncapsulation} from '@angular/core';
const items = [
	{title:'کاربران', logo:'users', link:'users', is_active:true , permission:['recruiting-admin','super-user']},
	{title:'حضور غیاب', logo:'fingerprint', link:'attendance', is_active:true , permission:['super-user']},
	{title:'گزارشات', logo:'bill', link:'report', is_active:true , permission:['super-user']},
	{title:'تقویم', logo:'calendar', link:'calendar', is_active:true , permission:['super-user']},
]
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
	items:any
	ngOnInit() {
		this.items = items.sort((a,b)=>{
			return (a.is_active === b.is_active)? 0 : a.is_active? -1 : 1;
		})
	}
}
