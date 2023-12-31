import {Component, OnInit, ViewEncapsulation} from '@angular/core';
const items = [
	{title:'کاربران', logo:'users', link:'users', is_active:true},
	{title:'حضور غیاب', logo:'fingerprint', link:'attendance', is_active:true},
	{title:'حقوق مزایا', logo:'bill', link:'bill', is_active:true},
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
