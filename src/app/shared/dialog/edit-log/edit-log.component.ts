import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { AttendanceService } from "../../../HttpServices/attendance.service";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: 'app-edit-log',
	templateUrl: './edit-log.component.html',
	styleUrls: ['./edit-log.component.scss']
})
export class EditLogComponent {
	
	form: FormGroup
	
	constructor(
		public dialogRef: MatDialogRef<EditLogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private http: AttendanceService,
		private _snackBar: MatSnackBar
	) {
		this.form = new FormGroup({
			hour: new FormControl(null, [Validators.required, validator.number.bind(this), Validators.max(23)]),
			min: new FormControl(null, [Validators.required, validator.number.bind(this), Validators.max(59)]),
			type: new FormControl(null, [Validators.required]),
			reason: new FormControl(null, [Validators.required])
		})
	}
	
	updateLog() {
		let body: any = {};
		body.guard_time = this.data.item.date + ' ' + this.form.get('hour')?.value + ':' + this.form.get('min')?.value
		body.guard_type = this.form.get('type')?.value
		body.guard_description = this.form.get('reason')?.value
		this.http.updateAttendances(body, this.data.item.id, 'conflict').subscribe({
			next: (data) => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `گزارش با موفقیت اعمال شد`,
					duration: 1000
				})
				this.dialogRef.close('success')
			},
			error: (e) => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `ارسال گزارش با خطا مواجه شد`,
					duration: 1000
				})
			}
		})
	}
	
}
