import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalendarHttpService } from "../../../HttpServices/calendar-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
	selector: 'app-day-status-change',
	templateUrl: './day-status-change.component.html',
	styleUrls: ['./day-status-change.component.scss']
})
export class DayStatusChangeComponent {
	
	statusForm: FormGroup
	
	constructor(
		public validate: FormValidateService,
		private validator: ValidationFormService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<DayStatusChangeComponent>,
        private http:CalendarHttpService,
		private _snackBar: MatSnackBar,
	) {
		this.statusForm = new FormGroup({
			is_holiday: new FormControl(data.is_holiday, [Validators.required]),
			reason: new FormControl(null, [Validators.required, validator.string])
		})
	}
	
	onSubmit() {
		let body = {
          year:+this.data.info.year,
          month:+this.data.info.month,
          day:+this.data.info.day,
          is_holiday:this.statusForm.value.is_holiday,
          reason:this.statusForm.value.reason
        }
        this.http.setHoliday(body).subscribe({
          next:(data:any)=>{
	          this._snackBar.openFromComponent(SnackbarComponent, {
		          data: `تغییر با موفقیت اعمال شد`,
		          duration: 1500
	          })
	          this.dialogRef.close({is_holiday:this.statusForm.value.is_holiday})
          },
          error:(err)=>{},
        })
	}
}
