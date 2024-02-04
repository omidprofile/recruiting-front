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
			effective:new FormControl("e",[Validators.required]),
			hour: new FormControl(null, [Validators.required, validator.number.bind(this), Validators.max(23)]),
			min: new FormControl(null, [Validators.required, validator.number.bind(this), Validators.max(59)]),
			type: new FormControl(null, [Validators.required]),
			reason: new FormControl(null, [Validators.required])
		})
	}
	change(){
		if (['ne','re'].includes(this.form.value.effective)){
			this.form.get('hour')?.setValidators([]);
			this.form.get('min')?.setValidators([]);
			this.form.get('type')?.setValidators([]);
		}
		else {
			this.form.get('hour')?.setValidators([Validators.required, this.validator.number.bind(this), Validators.max(23)]);
			this.form.get('min')?.setValidators([Validators.required, this.validator.number.bind(this), Validators.max(59)]);
			this.form.get('type')?.setValidators([Validators.required]);
		}
		this.form.get('hour')?.updateValueAndValidity();
		this.form.get('min')?.updateValueAndValidity();
		this.form.get('type')?.updateValueAndValidity();
	}
	updateLog() {
		let body: any = {};
		if (this.form.value.effective == 'e'){
			body.time = this.data.item.date + ' ' + this.form.get('hour')?.value + ':' + this.form.get('min')?.value
			body.type = this.form.get('type')?.value
			body.description = this.form.get('reason')?.value
		}
		else {
			body.status = this.form.value.effective == 'ne'?'ne':'e';
			body.description = this.form.get('reason')?.value;
		}
		this.http.updateAttendances(body, this.data.item.id, this.data.subject).subscribe({
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
