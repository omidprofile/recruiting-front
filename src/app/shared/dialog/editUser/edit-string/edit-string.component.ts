import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ValidationFormService } from "../../../../services/validation-form.service";
import { FormValidateService } from "../../../../services/form-validate.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { SnackbarComponent } from "../../../snackbar/snackbar.component";

@Component({
	selector: 'app-edit-string',
	templateUrl: './edit-string.component.html',
	styleUrls: ['./edit-string.component.scss']
})
export class EditStringComponent {
	form: FormGroup;
	
	constructor(
		public dialogRef: MatDialogRef<EditStringComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private _snackBar: MatSnackBar,
		private http: UsersHttpService
	) {
		let controls: any = {}
		controls[`${data.field}`] = new FormControl(data.value,
			[Validators.required,
				(!data.validators.length ? Validators.required :
						data.validators.includes('string') ?
							this.validator.string.bind(this) :
							data.validators.includes('persianString') ?
								this.validator.persianString.bind(this) :
								data.validators.includes('englishString') ?
									this.validator.englishString.bind(this) :
									data.validators.includes('nationalCode') ?
										this.validator.nationalCode.bind(this) :
										data.validators.includes('mobile') ?
											this.validator.mobile.bind(this) :
											data.validators.includes('phone') ?
												this.validator.phone.bind(this) : Validators.required
				)
			]
		)
		
		this.form = new FormGroup(controls)
		
		
	}
	
	submit() {
		let data = this.form.value;
		if (this.data.ref == 'baseuser') {
			if (this.data.field.includes('mobile')) {
				
					data = {
						newMob:this.form.value[this.data.field],
						oldMob:this.data.value
					}

				this.http.updateMobile({
					id: this.data.id,
					data: data
				}).subscribe({
					next: (data) => {
						this._snackBar.openFromComponent(SnackbarComponent, {
							data: `ویرایش با موفقیت انجام شد`,
							duration: 1000
						})
						this.dialogRef.close('success')
					},
					error: (error) => {
						this._snackBar.openFromComponent(SnackbarComponent, {
							data: `ویرایش با خطا مواجه شد`,
							duration: 1000
						})
						console.log(error)
					}
				})
			}
			if (this.data.field.includes('phone')) {
				let status = this.data.field.split('mobile')[1];
				// let index = this.data.fieldValue.indexOf()
				if (status == 'insert') {
				} else if (status == 'delete') {
				} else {
					this.data.value[status] = this.form.value[this.data.field];
					data = {mobile:this.data.value}
				}
			}
			if (this.data.field.includes('email')) {
				let status = this.data.field.split('mobile')[1];
				// let index = this.data.fieldValue.indexOf()
				if (status == 'insert') {
				} else if (status == 'delete') {
				} else {
					this.data.value[status] = this.form.value[this.data.field];
					data = {mobile:this.data.value}
				}
			}
			else{
				this.http.updateUser({
					id: this.data.id,
					data: data
				}).subscribe({
					next: (data) => {
						this._snackBar.openFromComponent(SnackbarComponent, {
							data: `ویرایش با موفقیت انجام شد`,
							duration: 1000
						})
						this.dialogRef.close('success')
					},
					error: (error) => {
						this._snackBar.openFromComponent(SnackbarComponent, {
							data: `ویرایش با خطا مواجه شد`,
							duration: 1000
						})
						console.log(error)
					}
				})
			}

		}
		if (this.data.ref == 'job') {
			this.http.updateJob({
				id: this.data.job_id,
				data: this.form.value
			}).subscribe({
				next: (data) => {
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `ویرایش با موفقیت انجام شد`,
						duration: 1000
					})
					this.dialogRef.close('success')
				},
				error: (error) => {
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `ویرایش با خطا مواجه شد`,
						duration: 1000
					})
					console.log(error)
				}
			})
		}
	}
}

//
// () => {
// 	let validate: any = [];
// 	if (data.validate.length)
// 		validate.push(Validators.required);
// 	if (data.validate.includes('number'))
// 		validate.push(this.validator.number.bind(this));
// 	if (data.validate.includes('persianString'))
// 		validate.push(this.validator.persianString.bind(this));
// 	if (data.validate.includes('englishString'))
// 		validate.push(this.validator.englishString.bind(this));
// 	if (data.validate.includes('string'))
// 		validate.push(this.validator.string.bind(this));
// 	if (data.validate.includes('nationalCode'))
// 		validate.push(this.validator.nationalCode.bind(this));
// 	if (data.validate.includes('mobile'))
// 		validate.push(this.validator.mobile.bind(this));
// 	if (data.validate.includes('phone'))
// 		validate.push(this.validator.phone.bind(this));
//
// 	console.log(validate)
// 	return validate
// }
// <mat-error *ngIf="data.validate.includes('number')">{{validate.numberValidate(form.get(data.field),data.title)}}</mat-error>
// <mat-error *ngIf="data.validate.includes('nationalCode')">{{validate.nationalCodeValidate(form.get(data.field))}}</mat-error>
// <mat-error *ngIf="data.validate.includes('mobile')">{{validate.mobileValidate(form.get(data.field))}}</mat-error>
// <mat-error *ngIf="data.validate.includes('phone')">{{validate.phoneValidate(form.get(data.field))}}</mat-error>
