import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormService } from "../../../../services/validation-form.service";
import { FormValidateService } from "../../../../services/form-validate.service";
import { AttendanceService } from "../../../../HttpServices/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: 'app-manual',
	templateUrl: './manual.component.html',
	styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {
	
	manualForm: FormGroup;
	devices: any;
	
	constructor(
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private http: AttendanceService,
		private _snackBar: MatSnackBar
	) {
		this.manualForm = new FormGroup({
			hour: new FormControl(null, [Validators.required, Validators.max(23), this.validator.number.bind(this)]),
			min: new FormControl(null, [Validators.required, Validators.max(59), this.validator.number.bind(this)]),
			sec: new FormControl(null, [Validators.required, Validators.max(59), this.validator.number.bind(this)]),
			year: new FormControl(null, [Validators.required, Validators.min(1400), this.validator.number.bind(this)]),
			month: new FormControl(null, [Validators.required, Validators.max(12), this.validator.number.bind(this)]),
			day: new FormControl(null, [Validators.required, Validators.max(31), this.validator.number.bind(this)]),
			personal_code: new FormControl(null, [Validators.required]),
			device: new FormControl(null, [Validators.required]),
			type: new FormControl(null, [Validators.required]),
		})
	}
	
	ngOnInit() {
		this.getDevices()
	}
	
	getDevices() {
		let params: any = {}
		params.is_active = true
		this.http.getDevices(params).subscribe({
			next: (data: any) => {
				this.devices = data.devices
			},
			error: (err) => {
				console.log(err)
			},
		})
	}
	
	submit() {
		let value = this.manualForm.value;
		let body: any = {};
		body.date = value.year + "/" + value.month + "/" + value.day + " " + value.hour + ":" + value.min + ":" + value.sec;
		body.device = value.device;
		body.type = value.type;
		body.personal_code = value.personal_code;
		
		this.http.createAttendances(body).subscribe({
			next:(data)=>{
				console.log(data)},
			error:(err)=>{
				console.log(err)},
		})
	}
}
