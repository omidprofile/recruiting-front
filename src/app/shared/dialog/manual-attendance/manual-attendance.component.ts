import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AttendanceService } from "../../../HttpServices/attendance.service";
import { UsersHttpService } from "../../../HttpServices/users-http.service";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ManualComponent } from "../../../panel/pages/attendance/manual/manual.component";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DateService } from "../../../services/date.service";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
	MaterialPersianDateAdapter,
	PERSIAN_DATE_FORMATS
} from "../../../services/material.persian-date.adapter.service";

@Component({
	selector: 'app-manual-attendance',
	templateUrl: './manual-attendance.component.html',
	styleUrls: ['./manual-attendance.component.scss'],
	providers: [
		{provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},]
})
export class ManualAttendanceComponent implements OnInit {
	form: FormGroup;
	user: any;
	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	options: any;
	filteredOptions: any[];
	devices: any;
	permit: any = localStorage.getItem('permission');
	
	
	constructor(
		private userHttp: UsersHttpService,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		public dialogRef: MatDialogRef<ManualAttendanceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private http: AttendanceService,
		private _snackBar: MatSnackBar,
		private date: DateService
	) {
		this.form = new FormGroup({
			user: new FormControl(null, [Validators.required]),
			device: new FormControl(null, [Validators.required]),
			hour: new FormControl(null, [Validators.required, Validators.max(23), Validators.min(0)]),
			min: new FormControl(null, [Validators.required, Validators.max(59), Validators.min(0)]),
			date: new FormControl(null, [Validators.required]),
			type: new FormControl(null, [Validators.required]),
			
		})
	}
	
	ngOnInit() {
		this.getUsers();
		this.getDevices();
		
		if (this.permit.includes('guard')) {
			this.form.get('date')?.setValidators([]);
			this.form.updateValueAndValidity();
		}
		if (this.permit.includes('recruiting-admin')) {
			this.form.get('date')?.setValidators([Validators.required]);
			this.form.updateValueAndValidity();
		}
		
		
		if (this.data.type) {
			this.form.get('type')?.setValidators([]);
			this.form.updateValueAndValidity();
		}
		
		if (this.data.date) {
			this.form.get('date')?.setValidators([]);
			this.form.updateValueAndValidity();
		}
		
		if (this.data.user) {
			this.form.get('user')?.setValidators([]);
			this.form.updateValueAndValidity();
		}
		
		if (this.data.device) {
			this.form.get('device')?.setValidators([]);
			this.form.updateValueAndValidity();
		}
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
	
	setUser(id: any) {
		this.form.get('user')?.setValue(id);
		this.form.updateValueAndValidity();
	}
	
	filter(): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
	}
	
	submit() {
		let value = this.form.value;
		let body: any = {};
		if (this.form.value.date)
			body.date = +new Date(this.form?.value?.date).setHours(this.form?.value?.hour, this.form?.value?.min);
		else if (!this.data.date)
			body.date = new Date().setHours(this.form?.value?.hour, this.form?.value?.min);
		else
			body.date = this.date.timeToUnix(this.data.date + " " + this.form?.value?.hour + ":" + this.form?.value?.min);
		if (this.data.device)
			body.device = this.data.device;
		else
			body.device = value.device;
		if (this.data.type)
			body.type = this.data.type;
		else
			body.type = this.form.value.type;
		if (this.data.user)
			body.personal_code = this.data.user;
		else
			body.personal_code = value.user;
		
		this.http.createAttendances(body).subscribe({
			next: (data) => {
				this.form.reset()
				this.ngOnInit();
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `اطلاعات با موفقیت ثبت شد`,
					duration: 1500
				})
				this.dialogRef.close('success')
			},
			error: (err) => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `خطا در ثبت`,
					duration: 1500
				})
				this.dialogRef.close()
			},
		})
	}
	
}
