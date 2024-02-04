import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormService } from "../../../../services/validation-form.service";
import { FormValidateService } from "../../../../services/form-validate.service";
import { AttendanceService } from "../../../../HttpServices/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
	MaterialPersianDateAdapter,
	PERSIAN_DATE_FORMATS
} from "../../../../services/material.persian-date.adapter.service";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";

@Component({
	selector: 'app-manual',
	templateUrl: './manual.component.html',
	styleUrls: ['./manual.component.scss'],
	providers: [
		{provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},]
})
export class ManualComponent implements OnInit {
	permit:any =localStorage.getItem('permission');
	manualForm: FormGroup;
	devices: any;
	user:any;
	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	options: any;
	filteredOptions: any[];
	constructor(
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private http: AttendanceService,
		private _snackBar: MatSnackBar,
		private userHttp: UsersHttpService
	) {
		this.manualForm = new FormGroup({
			min: new FormControl(null, [Validators.required, Validators.max(59), this.validator.number.bind(this)]),
			hour: new FormControl(null, [Validators.required, Validators.max(23), this.validator.number.bind(this)]),
			date: new FormControl(null, [Validators.required]),
			personal_code: new FormControl(null, [Validators.required]),
			device: new FormControl(null, [Validators.required]),
			type: new FormControl(null, [Validators.required]),
		})
	}
	
	ngOnInit() {
		this.getUsers();
		this.getDevices();
		if (this.permit.includes('guard')){
			this.manualForm.get('date')?.setValidators([]);
			this.manualForm.updateValueAndValidity();
		}
		if(this.permit.includes('recruiting-admin')){
			this.manualForm.get('date')?.setValidators([Validators.required]);
			this.manualForm.updateValueAndValidity();
		}
	}
	
	
	getDevices() {
		let params: any = {}
		params.is_active = true
		this.http.getDevices(params).subscribe({
			next: (data: any) => {
				this.devices = data.devices
			},
			error: (err) => {
			
			},
		})
	}
	
	getUsers() {
		this.userHttp.getUsers().subscribe((data: any) => {
			this.options = []
			for (let item of data) {
				let person: any = {}
				person.name = item.name + " " + item.last_name
				person.code = item.jobs_id[0]?.personal_code
				person.id = item._id
				person.shift = item.jobs_id[0]?.shift_info;
				person.collection = item.jobs_id[0]?.collection_info;
				person.part = item.jobs_id[0]?.part_info;
				person.rank = item.jobs_id[0]?.rank_info;
				this.options.push(person)
			}
			this.filteredOptions = this.options.slice();
		})
	}
	
	setUser(id: any) {
		this.manualForm.get('personal_code')?.setValue(id);
		this.manualForm.updateValueAndValidity()
	}
	
	filter(): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
	}
	
	submit() {
		
		let value = this.manualForm.value;
		let body: any = {};
		if (this.manualForm.value.date)
			body.date = +new Date(this.manualForm?.value?.date).setHours(this.manualForm?.value?.hour,this.manualForm?.value?.min);
		else
			body.date = new Date().setHours(this.manualForm?.value?.hour,this.manualForm?.value?.min)
		body.device = value.device;
		body.type = value.type;
		body.personal_code = value.personal_code;
		this.http.createAttendances(body).subscribe({
			next: (data) => {
				this.manualForm.reset()
				this.ngOnInit();
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `اطلاعات با موفقیت ثبت شد`,
					duration: 1500
				})
			},
			error: (err) => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `خطا در ثبت`,
					duration: 1500
				})
			},
		})
	}
}
