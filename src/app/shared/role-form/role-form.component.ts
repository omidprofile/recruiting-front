import {Component, Inject, Input, OnInit} from '@angular/core';
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
export class RoleFormComponent implements OnInit{
	rol: FormGroup
	error = false
	mode = 'create'
	
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
			'parent': new FormControl(null, [Validators.required]),
			'isActive': new FormControl(null, [Validators.required]),
		})
	}

	ngOnInit() {
		if (this.data.parent?.length == 1){
			this.parent.setValue(this.data.parent[0]._id)
			this.parent.setValidators([]);
			this.parent.updateValueAndValidity();
		}
		if (this.data.type == 'company'){
			this.parent.setValidators([]);
			this.parent.updateValueAndValidity();
		}
		if (this.data.value){
			this.mode = 'update'
			this.parent.setValidators([]);
			this.parent.updateValueAndValidity();
			this.rol.setValue({
				title:this.data.value[0].title,
				description:this.data.value[0].description,
				isActive:this.data.value[0].isActive,
				parent:this.data.value[0].parent??null

			})
		}
	}

	get title() {
		return this.rol.get('title') as FormControl
	}

	get parent() {
		return this.rol.get('parent') as FormControl
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
		if (this.data.type == 'collection'){
			let formData = this.rol.value
			formData.company = this.parent.value
			this.http.createCollection(formData).subscribe({
				next:()=>{
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ثبت شد`,
						duration: 1500
					})
				},
				error:(e)=>{
					this.rol.get('title')?.setErrors({'duplicate': true})
					this.error = true
				}
			})
		}
		if (this.data.type == 'part'){
			let formData = this.rol.value
			formData.parent = this.parent.value
			this.http.createPart(formData).subscribe({
				next:()=>{
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ثبت شد`,
						duration: 1500
					})
				},
				error:(e)=>{
					this.rol.get('title')?.setErrors({'duplicate': true})
					this.error = true
					console.log(e)
				}
			})
		}
		if (this.data.type == 'rank'){
			let formData = this.rol.value
			formData.part = this.parent.value
			this.http.createRank(formData).subscribe({
				next:()=>{
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ثبت شد`,
						duration: 1500
					})
				},
				error:(e)=>{
					this.rol.get('title')?.setErrors({'duplicate': true})
					this.error = true
				}
			})
		}
	}

	update(){
		let formData = this.rol.value
		if(this.data.type == 'company'){
			this.http.updateCompany(formData, this.data.value[0]._id).subscribe({
				next: (data) => {
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ویراش شد`,
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
		if(this.data.type == 'collection'){
			this.http.updateCollection(formData, this.data.value[0]._id).subscribe({
				next: (data) => {
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ویراش شد`,
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
		if(this.data.type == 'part'){
			this.http.updatePart(formData, this.data.value[0]._id).subscribe({
				next: (data) => {
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ویراش شد`,
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
		if(this.data.type == 'rank'){
			this.http.updateRank(formData, this.data.value[0]._id).subscribe({
				next: (data) => {
					this.dialogRef.close({created: true})
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `${this.data.title} با موفقیت ویراش شد`,
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
		this.dialogRef.close({created:false});
	}

	protected readonly console = console;
}
