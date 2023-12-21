import { Component, OnInit } from '@angular/core';
import { log10 } from "chart.js/helpers";
import { RolesHttpService } from "../../../../HttpServices/roles-http.service";
import { async, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { RoleFormComponent } from "../../../../shared/role-form/role-form.component";

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
	
	companies: any;
	company_value: any
	collection_value: any;
	part_value: any;
	rank_value: any;
	
	collection_show: any;
	part_show: any;
	rank_show: any;
	
	constructor(private http: RolesHttpService, public dialog: MatDialog) {
	}
	
	ngOnInit() {
		this.getCompanies()
	}
	
	getCompanies() {
		this.http.getCompanies().subscribe(data => {
			this.companies = data
		})
	}
	
	 getSection() {
		this.collection_value = null
		this.part_value = null
		this.rank_value = null
		this.collection_show = null
		for (let item of this.company_value){
			 this.http.getCollection(item._id).subscribe({
				next: (data: any) => {
					if (this.collection_show == undefined) {
						this.collection_show = data.collections
					} else {
						this.collection_show.push(...data.collections)
					}
				},
				error: (error) => {
					console.log(error)
				}
			})
		}
	}
	
	getSector() {
		this.part_value = null
		this.rank_value = null
		this.part_show = null
		for(let item of this.collection_value) {
			this.http.getPart(item._id).subscribe({
				next: (data: any) => {
					if (this.part_show == undefined) {
						this.part_show = data.parts
					} else {
						this.part_show.push(...data.parts)
					}
				},
				error: (error) => {
					console.log(error)
				}
			})
		}
	}
	
	getRank() {
		this.rank_show = null
		for(let item of this.part_value) {
			this.http.getRank(item._id).subscribe({
				next: (data: any) => {
					if (this.rank_show == undefined) {
						this.rank_show = data.ranks
					} else {
						this.rank_show.push(...data.ranks)
					}
				},
				error: (error) => {
					console.log(error)
				}
			})
		}
	}
	
	openDialog(type:string, title:string, parent?:any, value?:any): void {
		const dialogRef = this.dialog.open(RoleFormComponent, {
			data: {type:type,parent:parent, title:title, value:value},
		});
		
		dialogRef.afterClosed().subscribe(result => {
			if (result.created){
				if (type == 'company')
					this.getCompanies()
				if (type == 'collection')
					this.getSection()
				if (type == 'part')
					this.getSector()
				if (type == 'rank')
					this.getRank()
			}
		});
	}
	

	
}
