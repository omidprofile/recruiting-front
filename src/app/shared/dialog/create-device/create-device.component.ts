import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AttendanceService } from "../../../HttpServices/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
	selector: 'app-create-device',
	templateUrl: './create-device.component.html',
	styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit{
	device:FormGroup
	constructor(
		public dialogRef: MatDialogRef<CreateDeviceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		private http:AttendanceService,
		private _snackBar: MatSnackBar,
		public validate: FormValidateService) {
      this.device = new FormGroup({
        name:new FormControl(null, [Validators.required, validator.persianString.bind(this)]),
        ip:new FormControl(null, [Validators.required]),
        port:new FormControl(null, [Validators.required,validator.number.bind(this)]),
        serial:new FormControl(null, [Validators.required]),
        is_active:new FormControl(null, [Validators.required]),
      })
	}
	
	ngOnInit() {
		if (this.data.type == 'update'){
			this.device.setValue({
				name:this.data.data.name,
				ip:this.data.data.ip,
				port:this.data.data.port,
				serial:this.data.data.serial,
				is_active:this.data.data.is_active
			})
		}
	}
	
	onSubmit(){
		let id = this.data.data._id
		let body = this.device.value
		this.http.updateDevice(body,id).subscribe({
			next:(data)=>{
				this.dialogRef.close('success')
			},
			error:(err)=>{
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `خطا در بروز رسانی اطلاعات`,
					duration: 1500
				})
			},
		})
		
	}
	
}
