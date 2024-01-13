import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { Router } from "@angular/router";

export interface PeriodicElement {
	name: string;
	personal_code: string;
	roll: string;
	status: boolean;
}


@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {
	title='لیست کاربران'
	displayedColumns: string[] = ['national_code', 'name', 'roll', 'status'];
	dataSource: any;
	show_data:any;
	searchKey: string = '';
	searchValue: string = '';
	@ViewChild(MatTable) table: MatTable<PeriodicElement>;
	
	constructor(private http: UsersHttpService, public router: Router) {
	}
	
	
	ngOnInit() {
		setTimeout(() => {
			this.getUsers()
		}, 100)
	}
	
	ngAfterViewInit() {
	}
	
	
	getUsers() {
		this.http.getUsers().subscribe({
			next: (data: any) => {
				let item: any = {}
				this.dataSource = []
				for (let user of data) {
					item.national_code = user.national_code
					item.name = user.name + ' ' + user.last_name
					let roles:any = []
					for (let rol of user.jobs_id)
						roles.push(rol.rank_info.title)
					item.roll = roles
					item.status = user.is_active
					this.dataSource.push(item)
					item = {}
				}
				this.show_data = JSON.parse(JSON.stringify(this.dataSource))
			},
			error: () => {
			}
		})
	}
	
	paginator(data: any) {
		setTimeout(()=>{
			this.show_data = data
		})
	}
	
	
	searching(key: any, value: any) {
		this.searchValue = '';
		this.searchKey = key;
		this.searchValue = value;
	}
	
	updateElement(personal_code: any) {
		this.dataSource.map((e: any) => {
			e.personal_code == personal_code ? e.status = !e.status : '';
		})
	}
	
	test(row: any) {
		console.log(row)
	}
}
