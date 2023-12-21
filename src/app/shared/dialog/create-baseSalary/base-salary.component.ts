import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { RolesHttpService } from "../../../HttpServices/roles-http.service";

@Component({
	selector: 'app-create-shift',
	templateUrl: './base-salary.component.html',
	styleUrls: ['./base-salary.component.scss']
})
export class BaseSalary {
	shiftForm: FormGroup
	error = false;
	
	constructor(
		public validate: FormValidateService,
		private validator: ValidationFormService,
		public dialogRef: MatDialogRef<BaseSalary>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _snackBar: MatSnackBar,
		private http: RolesHttpService
	) {
		this.shiftForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			hourPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			extraHourPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			dailyPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			monthlyPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			housingPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			subsidy: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			childPayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			interim_interest: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			transportation: new FormControl(null, [Validators.required, validator.number.bind(this)]),
			insurancePayment: new FormControl(null, [Validators.required, validator.number.bind(this)]),
		})
	}
	
	onSubmit() {
		let body = this.shiftForm.value;
		body.part = this.data.part
		body.hourPayment = +body.hourPayment
		body.extraHourPayment = +body.extraHourPayment
		body.dailyPayment = +body.dailyPayment
		body.monthlyPayment = +body.monthlyPayment
		body.housingPayment = +body.housingPayment
		body.subsidy = +body.subsidy
		body.childPayment = +body.childPayment
		body.interim_interest = +body.interim_interest
		body.transportation = +body.transportation
		body.insurancePayment = +body.insurancePayment
		
		this.http.createBaseSalary(body).subscribe({
			next: (data) => {
				this.dialogRef.close({created: true})
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `${body.title} با موفقیت ثبت شد`,
					duration: 1500
				})
			},
			error: (err) => {
				this.shiftForm.get('title')?.setErrors({'duplicate': true})
				this.error = true
				console.log(err)
			},
		})
	}
	
	protected readonly parseInt = parseInt;
}
