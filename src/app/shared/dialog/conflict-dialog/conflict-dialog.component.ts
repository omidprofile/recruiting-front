import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-conflict-dialog',
  templateUrl: './conflict-dialog.component.html',
  styleUrls: ['./conflict-dialog.component.scss']
})
export class ConflictDialogComponent {
  
  constructor(
      public dialogRef: MatDialogRef<ConflictDialogComponent>,
                      @Inject(MAT_DIALOG_DATA) public data: any,) {
  }
  
  createHour(hour:any){
    let result = Math.floor(hour)+":"
    let min = hour - Math.floor(hour);
    min = min*60;
    result = result + (min ==0?"00:":Math.floor(min)+":")
    let sec = min - Math.floor(min)
    sec = sec*60;
    result = result+ (sec == 0?"00":Math.floor(sec))
    return result
  }
  

}
