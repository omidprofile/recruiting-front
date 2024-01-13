import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { CalendarHttpService } from "../../../HttpServices/calendar-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-day-create-event',
  templateUrl: './day-create-event.component.html',
  styleUrls: ['./day-create-event.component.scss']
})
export class DayCreateEventComponent {
  
  eventForm:FormGroup
  constructor(
      public validate: FormValidateService,
      private validator: ValidationFormService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<DayCreateEventComponent>,
      private http:CalendarHttpService,
      private _snackBar: MatSnackBar,
  ) {
    this.eventForm = new FormGroup({
      event:new FormControl(null,[Validators.required, validator.string])
    })
  }
  
  onSubmit() {
    let body = {
      year:+this.data.info.year,
      month:+this.data.info.month,
      day:+this.data.info.day,
      description:this.eventForm.value.event,

    }
    this.http.setEvent(body).subscribe({
      next:(data:any)=>{
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: `تغییر با موفقیت اعمال شد`,
          duration: 1500
        })
        this.dialogRef.close({description:this.eventForm.value.event})
      },
      error:(err)=>{},
    })
  }

}
