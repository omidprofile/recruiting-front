import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateService } from "../../../../services/date.service";
import { FormValidateService } from "../../../../services/form-validate.service";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { PrintService } from "../../../../services/print.service";
import { Router } from "@angular/router";
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
@Component({
	selector: 'app-to-bank',
	templateUrl: './to-bank.component.html',
	styleUrls: ['./to-bank.component.scss'],
})
export class ToBankComponent {
	form: FormGroup;
	displayedColumns: string[] = ['No', 'user', 'personal_code' ,'bank_account_number' , 'movement','salary','sum', 'trust','select'];
	dataSource:any;
	
	constructor(
		private date: DateService,
		public validate: FormValidateService,
		private http: UsersHttpService,
		private printer:PrintService,
		private route: Router,
	) {
		let toDay = this.date.dateInfo(Date.now());
		this.form = new FormGroup({
			year: new FormControl(null, [Validators.required, Validators.max(toDay.year), Validators.min(1300)]),
			month: new FormControl(null, [Validators.required, Validators.max(12), Validators.min(0)])
		})
	}
	
	submit(){
	this.http.toBank({
		title:`${this.form.value.year}/${this.form.value.month}`
	}).subscribe({
		next:(data:any)=>{
			this.dataSource = (data.result);
			// this.dataSource = new MatTableDataSource<any>(data.result);
		},
		error:(err)=>{},
	})
	}
	
	selection = new SelectionModel<any>(true, []);
	
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.length;
		return numSelected === numRows;
	}
	
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}
		
		this.selection.select(...this.dataSource);
	}
	
	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}
	
	print(){
		this.printer.set(this.selection['_selected']);
		this.route.navigate(['/print/toBankPrint'])
	}
}
