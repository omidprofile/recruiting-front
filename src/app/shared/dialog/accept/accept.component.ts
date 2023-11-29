import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent {
  constructor(
      public dialogRef: MatDialogRef<AcceptComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
