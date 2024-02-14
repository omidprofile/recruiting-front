import { Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IncDecHttpService } from "../../HttpServices/inc-dec-http.service";
import { DateService } from "../../services/date.service";
import { MatTable } from "@angular/material/table";
import { PeriodicElement } from "../../panel/pages/users/users-list/users-list.component";
import { IncDecDialogComponent } from "../dialog/inc-dec-dialog/inc-dec-dialog.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IncDecConfirmComponent } from "../dialog/inc-dec-confirm/inc-dec-confirm.component";


@Component({
	selector: 'app-ind-dec-table',
	templateUrl: './ind-dec-table.component.html',
	styleUrls: ['./ind-dec-table.component.scss']
})
export class IndDecTableComponent implements OnInit , OnChanges{
	displayedColumns: string[] = ['NO', 'user', 'personal_code', 'title', 'type', 'price', 'date', 'period', 'apply', 'status', 'description','action'];
	dataSource: any;
	@ViewChild(MatTable) table: MatTable<PeriodicElement>;
	@Input()type:any;
	dataShow: any
	
	constructor(private http:IncDecHttpService, private date:DateService,
	            private _snackBar: MatSnackBar,
	            public dialog:MatDialog
	            ) {
	}
	
	ngOnInit() {
		this.get();
	}
	ngOnChanges() {
		this.get();
	}
	
	get(){
		this.dataSource = [];
		let query:any = {};
		if (!this.type)
			query = {};
		else if(this.type == 'done')
			query.confirm = true;
		else if (this.type == 'waiting')
			query.status = 'waiting'
		else if (this.type == 'undecided'){
			query.status = 'old'
			query.confirm = false
		}
		else if(this.type == 'now')
			query.status = 'now'

		else if(this.type == 'old')
			query.status = 'old'
		
		this.http.get(query).subscribe({
			next:(data:any)=>{
				data = data.data;
				this.dataSource = [];
				for(let item of data){
					let temp:any={};
					temp.id = item._id;
					temp.user = item.user.user_id.name +" "+item.user.user_id.last_name;
					temp.user_id = item.user._id;
					temp.personal_code = item.user.personal_code;
					temp.title = item.title;
					temp.en_type = item.type;
					temp.type = item.type == 'increase'? 'پرداختی':'مطالبه';
					temp.price = item.price;
					temp.date = this.date.dateInfo(item.date).date;
					temp.unix = item.date;
					temp.period = item.period;
					temp.apply = item.apply == 'anyTime'?'مستقل':'روی حقوق';
					temp.en_apply = item.apply
					temp.en_status = this.getStatus(item.date)
					temp.confirm = item.confirm
					if(item.confirm){
						temp.status = 'انجام شده'
						temp.theme = 'done'
					}
					if (!item.confirm && temp.en_status == 'now'){
						temp.status = 'موعد انجام'
						temp.theme = 'now'
					}
					
					if (!item.confirm && temp.en_status == 'old'){
						temp.status = 'بلاتکلیف'
						temp.theme = 'undecided'
					}
					
					if (!item.confirm && temp.en_status == 'waiting'){
						temp.status = 'درانتظار'
						temp.theme = 'waiting'
					}
					temp.description = item.description;
					this.dataSource.push(temp);
				}
				this.dataShow = JSON.parse(JSON.stringify(this.dataSource))
				this.table.renderRows();
			},
			error:(error:any)=>{console.log(error)},
		})
	}
	
	openDialog(element?:any){
		const dialogRef = this.dialog.open(IncDecDialogComponent, {
			data: element,
			width:'500px',
			disableClose:true
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result == 'success'){
				this.get();
			}
		})
	}
	
	getStatus(date:any){
		let startDay = +new Date().setHours(0,0,0,0)-1;
		let endDay = +new Date().setHours(23,59,59);
		return date > endDay ? 'waiting' : date < endDay && date > startDay ? 'now' : 'old'
	}
	
	confirm(data:any){
		const dialogRef = this.dialog.open(IncDecConfirmComponent, {
			data: data,
			width:'500px',
			disableClose:true
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result == 'success'){
				this.get();
			}
		})
	}
	
	paginator(data: any) {
		setTimeout(() => {
			this.dataShow = data
		})
	}
}
