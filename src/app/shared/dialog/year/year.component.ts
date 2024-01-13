import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-year',
	templateUrl: './year.component.html',
	styleUrls: ['./year.component.scss']
})
export class YearComponent {
	currentYear = 1402;
	start = 1356;
	end= 1420;
	years:any=[];
	yearsList:any = [];
	startIndex=0;
	lastIndex = 0;
	
	constructor(public dialogRef: MatDialogRef<YearComponent>,
	            @Inject(MAT_DIALOG_DATA) public data: any,) {
		this.preparingYears();
		this.preparingTable();
	}
	preparingYears(){
		for (let i = this.start;i<=this.end;i++){
			this.years.push(i)
		}
	}
	preparingTable(){
		let index = this.years.indexOf(this.currentYear);
		this.startIndex = index-3;
		this.lastIndex = index + 13;
		this.yearsList = this.years.slice(this.startIndex, this.lastIndex)
	}
	preYear(){
		this.lastIndex = this.startIndex;
		this.startIndex = this.startIndex-16 >=0?this.startIndex-16:0
		this.yearsList = this.years.slice(this.startIndex, this.lastIndex)
	}
	nextYear(){
		console.log(this.lastIndex)
		this.startIndex = this.lastIndex;
		this.lastIndex = this.lastIndex+16 <= this.years.length?this.lastIndex+16:this.years.length;
		console.log(this.lastIndex)
		this.yearsList = this.years.slice(this.startIndex, this.lastIndex)
	}
	protected readonly Array = Array;
}
