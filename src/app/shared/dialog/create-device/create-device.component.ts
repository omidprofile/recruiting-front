import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
		public validate: FormValidateService) {
      this.device = new FormGroup({
        name:new FormControl(null, [Validators.required, validator.persianString.bind(this)]),
        ip:new FormControl(null, [Validators.required]),
        port:new FormControl(null, [Validators.required,validator.number.bind(this)]),
        serial:new FormControl(null, [Validators.required]),
        status:new FormControl(null, [Validators.required]),
      })
	}
	
	ngOnInit() {
		if (this.data.type == 'update'){
			this.device.setValue({
				name:this.data.data.name,
				ip:this.data.data.ip,
				port:this.data.data.port,
				serial:this.data.data.serial,
				status:this.data.data.status
			})
		}
	}
	
}
