import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormService } from "../../services/validation-form.service";
import { FormValidateService } from "../../services/form-validate.service";
import { RolesHttpService } from "../../HttpServices/roles-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {
	rol: FormGroup
	error = false
	
	constructor(
		public dialogRef: MatDialogRef<RoleFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private http: RolesHttpService,
		private _snackBar: MatSnackBar
	) {
		this.rol = new FormGroup({
			'title': new FormControl(null, [Validators.required]),
			'description': new FormControl(null, [Validators.required]),
			'isActive': new FormControl(null, [Validators.required]),
		})
	}
	
	get title() {
		return this.rol.get('title') as FormControl
	}
	
	onSubmit() {
		let formData;
		this.title.setValue(this.title.value.toString().trim())
		formData = this.rol.value
		if (this.data.type == 'company') {
			this.http.createCompany(formData).subscribe({
				next: (data) => {
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ثبت شد`,
						duration: 1500
					})
				},
				error: (e) => {
					this.rol.get('title')?.setErrors({'duplicate': true})
					this.error = true
					console.log(e)
				}
			})
		}
	}
	
	onNoClick(): void {
		this.dialogRef.close();
	}
}
