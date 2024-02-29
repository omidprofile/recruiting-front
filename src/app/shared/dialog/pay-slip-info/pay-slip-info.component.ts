import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-pay-slip-info',
	templateUrl: './pay-slip-info.component.html',
	styleUrls: ['./pay-slip-info.component.scss']
})
export class PaySlipInfoComponent implements OnInit{
  
  displayedColumns:any=['No','title','price']
  dataSource:any;
	constructor(
		public dialogRef: MatDialogRef<PaySlipInfoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,) {
    }
    
	ngOnInit() {
		this.dataSource = this.data;
	}
}
