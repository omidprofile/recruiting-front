import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersianCurrencyPipe } from "../../../../shared/pipe/persian-currency.pipe";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
	MaterialPersianDateAdapter,
	PERSIAN_DATE_FORMATS
} from "../../../../services/material.persian-date.adapter.service";
import { MatDialog } from "@angular/material/dialog";
import { IncDecDialogComponent } from "../../../../shared/dialog/inc-dec-dialog/inc-dec-dialog.component";
import { IndDecTableComponent } from "../../../../shared/ind-dec-table/ind-dec-table.component";

@Component({
	selector: 'app-inc-dec',
	templateUrl: './inc-dec.component.html',
	styleUrls: ['./inc-dec.component.scss'],
	providers: [PersianCurrencyPipe,
		{provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},],
})
export class IncDecComponent {
	constructor(public dialog: MatDialog) {
	}
	
	click = '';
	indexes = ['', 'waiting', 'now', 'old', 'done', 'undecided'];
	@ViewChild('table')table:IndDecTableComponent
	
	openDialog(element?:any){
		const dialogRef = this.dialog.open(IncDecDialogComponent, {
			data: element,
			width:'500px',
			disableClose:true
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result == 'success'){
			this.table.get();
			}
		})
	}
	
}
