import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent {
  
  months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "اَمرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  
  constructor(		public dialogRef: MatDialogRef<MonthComponent>,
                      @Inject(MAT_DIALOG_DATA) public data: any,) {
  }
  
  
  
}
