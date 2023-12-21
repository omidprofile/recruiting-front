import { Component, Inject } from '@angular/core';
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RolesHttpService } from "../../../HttpServices/roles-http.service";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
	selector: 'app-create-shift',
	templateUrl: './create-shift.component.html',
	styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent {
	shiftForm: FormGroup
	error = false;
	
	constructor(
		public validate: FormValidateService,
		private validator: ValidationFormService,
		public dialogRef: MatDialogRef<CreateShiftComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _snackBar: MatSnackBar,
        private http:RolesHttpService
	) {
		this.shiftForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			work_type: new FormControl(null, [Validators.required]),
			startHour: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0), validator.number.bind(this)]),
			startMin: new FormControl(null, [Validators.required, Validators.max(59), Validators.min(0), validator.number.bind(this)]),
			endHour: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0), validator.number.bind(this)]),
			endMin: new FormControl(null, [Validators.required, Validators.max(59), Validators.min(0), validator.number.bind(this)]),
			force_time: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0), validator.number.bind(this)]),
			force_extra_time: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0), validator.number.bind(this)]),
			max_time: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0), validator.number.bind(this)]),
		})
	}
	
	onSubmit() {
		let body: any = {}
		let formValue = this.shiftForm.value
		body.title = formValue.title;
		body.work_type = formValue.work_type;
        body.start = formValue.startHour+":"+formValue.startMin;
        body.end = formValue.endHour+":"+formValue.endMin;
        body.force_time = +formValue.force_time;
        body.force_extra_time = +formValue.force_extra_time;
        body.max_time = +formValue.max_time;
        body.part = this.data.part
      this.http.createShift(body).subscribe({
        next:(data)=>{
          this.dialogRef.close({created: true})
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: `${body.title} با موفقیت ثبت شد`,
            duration: 1500
          })
        },
        error:(err)=>{
          this.shiftForm.get('title')?.setErrors({'duplicate': true})
          this.error = true
          console.log(err)
        },
      })
	}
}
