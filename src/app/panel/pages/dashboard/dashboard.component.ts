import {Component, OnInit, ViewEncapsulation} from '@angular/core';
const items = [
	{title:'کاربران', logo:'users', link:'users', is_active:true},
	{title:'حضور غیاب', logo:'fingerprint', link:'', is_active:false},
	{title:'حقوق', logo:'bill', link:'', is_active:false},
]
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

	ngOnInit() {
	}

	protected readonly items = items;
}
