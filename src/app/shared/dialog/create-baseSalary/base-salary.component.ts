import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../../services/form-validate.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { RolesHttpService } from "../../../HttpServices/roles-http.service";
import { DateService } from "../../../services/date.service";

@Component({
	selector: 'app-create-shift',
	templateUrl: './base-salary.component.html',
	styleUrls: ['./base-salary.component.scss']
})
export class BaseSalary {
	salaryForm: FormGroup
	error = false;
	hourPayment: number;
	extraHourPayment: number;
	dailyPayment: number;
	toPay = '';
	constructor(
		public validate: FormValidateService,
		private validator: ValidationFormService,
		public dialogRef: MatDialogRef<BaseSalary>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _snackBar: MatSnackBar,
		private http: RolesHttpService,
		public date:DateService
	) {
		console.log(data)
		this.salaryForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			hourPayment: new FormControl({
				value: null,
				disabled: true
			}, [Validators.required, validator.currency.bind(this)],),
			extraHourPayment: new FormControl({
				value: null,
				disabled: true
			}, [Validators.required, validator.currency.bind(this)],),
			dailyPayment: new FormControl({
				value: null,
				disabled: true
			}, [Validators.required, validator.currency.bind(this)],),
			monthlyPayment: new FormControl('', [Validators.required, validator.currency.bind(this)]),
			housingPayment: new FormControl('', [Validators.required, validator.currency.bind(this)]),
			subsidy: new FormControl('', [Validators.required, validator.currency.bind(this)]),
			childPayment: new FormControl('', [Validators.required, validator.currency.bind(this)]),
			interim_interest: new FormControl('', [Validators.required, validator.currency.bind(this)]),
			transportation: new FormControl('', [Validators.required, validator.currency.bind(this)]),
		})
	}
	
	onSubmit() {
		let body = this.salaryForm.value;
		// body.part = this.data.part
		body.hourPayment = this.date.convertLocalToNum(this.hourPayment)
		body.extraHourPayment = this.date.convertLocalToNum(this.extraHourPayment)
		body.dailyPayment = this.date.convertLocalToNum(this.dailyPayment)
		body.monthlyPayment = this.date.convertLocalToNum(body.monthlyPayment)
		body.housingPayment = this.date.convertLocalToNum(body.housingPayment)
		body.subsidy = this.date.convertLocalToNum(body.subsidy)
		body.childPayment = this.date.convertLocalToNum(body.childPayment)
		body.interim_interest = this.date.convertLocalToNum(body.interim_interest)
		body.transportation = this.date.convertLocalToNum(body.transportation)
		
		this.http.createBaseSalary(body).subscribe({
			next: (data) => {
				this.dialogRef.close({created: true})
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `${body.title} با موفقیت ثبت شد`,
					duration: 1500
				})
			},
			error: (err) => {
				this.salaryForm.get('title')?.setErrors({'duplicate': true})
				this.error = true
				console.log(err)
			},
		})
	}
	
	hourPaymentCalc() {
		let payment = this.salaryForm.value.hourPayment;
		this.salaryForm.get('extraHourPayment')?.setValue(parseInt(String((payment / (7.33)) * 1.4)));
		this.salaryForm.get('dailyPayment')?.setValue(payment * this.data.shift[0].force_time);
		this.salaryForm.get('monthlyPayment')?.setValue(payment * this.data.shift[0].force_time * 31);
		this.salaryForm.updateValueAndValidity();
	}
	
	extraHourPaymentCalc() {
	}
	
	dailyPaymentCalc() {
	}
	monthlyPaymentCalc() {
		
		let payment =  this.date.convertLocalToNum(this.salaryForm.value.monthlyPayment);
		// this.salaryForm.get('monthlyPayment')?.setValue(Number(this.date.toEnDigit(this.salaryForm.value.monthlyPayment).replace(/\D/g,'')).toLocaleString('fa-IR'));
		this.hourPayment = (payment / 240)
		this.extraHourPayment = ((((payment / 240) * this.data.shift[0].force_time) / (7.33))) * 1.4
		this.dailyPayment = (payment / 240) * this.data.shift[0].force_time
		// this.salaryForm.get('hourPayment')?.setValue((payment/240));
		this.salaryForm.get('extraHourPayment')?.setValue(this.extraHourPayment.toLocaleString('fa-IR'));
		this.salaryForm.get('dailyPayment')?.setValue(this.dailyPayment.toLocaleString('fa-IR'));
		this.salaryForm.get('hourPayment')?.setValue(this.hourPayment.toLocaleString('fa-IR'));
		this.salaryForm.updateValueAndValidity();
	}
	
}
