import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DayStatusChangeComponent } from "../day-status-change/day-status-change.component";
import { DayCreateEventComponent } from "../day-create-event/day-create-event.component";

@Component({
  selector: 'app-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.scss']
})
export class DayEventsComponent {

  makeChange=false;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<DayEventsComponent>,
      public dialog: MatDialog,
  ) {
    console.log(data)
  }
  
  changeStatus(){
    const dialogRef = this.dialog.open(DayStatusChangeComponent, {
      width:'400px',
      disableClose:true,
      data:{is_holiday:this.data.dayInfo.is_holiday,info:this.data}
    });
    dialogRef.afterClosed().subscribe(async (data:any)=>{
      if (data){
        this.data.dayInfo.is_holiday = data.is_holiday;
        this.makeChange = true;
      }
    })
  }
  
  addEvents(){
    const dialogRef = this.dialog.open(DayCreateEventComponent, {
      width:'400px',
      disableClose:true,
      data:{is_holiday:this.data.dayInfo.is_holiday, info:this.data}
    });
    dialogRef.afterClosed().subscribe(async (data:any)=>{
    if (data){
      this.data.dayInfo.events.push(data);
      this.makeChange = true;
    }
    })
  }
}
