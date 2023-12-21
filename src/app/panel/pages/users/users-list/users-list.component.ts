import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";

export interface PeriodicElement {
	name: string;
	personal_code: string;
	roll: string;
	status: boolean;
}

let ELEMENT_DATA: PeriodicElement[] = [
	{personal_code: "1", name: 'Hydrogen', roll: "مدیر تولید", status: true},
	{personal_code: "2", name: 'Helium', roll: "مدیر تولید", status: true},
	{personal_code: "3", name: 'Lithium', roll: "مدیر تولید", status: true},
	{personal_code: "4", name: 'Beryllium', roll: "مدیر تولید", status: true},
	{personal_code: "5", name: 'Boron', roll: "مدیر تولید", status: true},
	{personal_code: "6", name: 'Carbon', roll: "مدیر تولید", status: true},
	{personal_code: "7", name: 'Nitrogen', roll: "مدیر تولید", status: true},
	{personal_code: "8", name: 'Oxygen', roll: "مدیر تولید", status: true},
	{personal_code: "9", name: 'Fluorine', roll: "مدیر تولید", status: true},
	{personal_code: "10", name: 'Neon', roll: "مدیر تولید", status: true},
	{personal_code: "11", name: 'Neon', roll: "مدیر تولید", status: true},
	{personal_code: "11", name: 'Neon', roll: "مدیر تولید", status: true},
	{personal_code: "11", name: 'Neon', roll: "مدیر تولید", status: true},
	{personal_code: "11", name: 'Neon', roll: "مدیر تولید", status: true},
	{personal_code: "11", name: 'Neon', roll: "مدیر تولید", status: true},

];

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ['personal_code', 'name', 'roll', 'status'];
	dataSource: any;
	show_data:any;
	searchKey: string = '';
	searchValue: string = '';
	@ViewChild(MatTable) table: MatTable<PeriodicElement>;
	
	constructor(private http: UsersHttpService) {
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
					item.personal_code = user.user_id.personal_code??user.personal_code
					item.name = user.user_id.name + ' ' + user.user_id.last_name
					item.roll = user.title ?? user.rank_info?.title
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
