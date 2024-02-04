import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersHttpService } from "../../../HttpServices/users-http.service";

@Component({
	selector: 'app-job-info',
	templateUrl: './job-info.component.html',
	styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
	dataSource:any;
	displayedColumns: string[] = ['title', 'value', 'action'];
	constructor(
		public dialogRef: MatDialogRef<JobInfoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private _snackBar: MatSnackBar,
		private http: UsersHttpService
	) {
		if (data.field == 'company_info')
			this.getCompany();
   
		if (data.field == 'collection_info')
			this.getCollection();
   
		if (data.field == 'part_info')
			this.getPart();
		
		if (data.field == 'rank_info')
			this.getRank();
   
		if (data.field == 'insurance_info')
			this.getInsurance();
   
		if (data.field == 'baseSalary_info')
			this.getBaseSalary();
   
		if (data.field == 'shift_info')
			this.getShift();
	}
	
	getCompany() {
	this.dataSource = [
		{title:'عنوان', value:this.data.data.title, field:'title',action:''},
		{title:'وضعیت', value:this.data.data.isActive, field:'isActive',action:''},
		{title:'شرح وظایف', value:this.data.data.description, field:'description',action:''},
	]
	}
	
	getPart() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'وضعیت', value:this.data.data.isActive, field:'isActive',action:''},
			{title:'شرح وظایف', value:this.data.data.description, field:'description',action:''},
		]
	}
	
	getCollection() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'وضعیت', value:this.data.data.isActive, field:'isActive',action:''},
			{title:'شرح وظایف', value:this.data.data.description, field:'description',action:''},
		]
	}
	
	getRank() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'وضعیت', value:this.data.data.isActive, field:'isActive',action:''},
			{title:'شرح وظایف', value:this.data.data.description, field:'description',action:''},
		]
	}
	
	getShift() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'نوع', value:this.data.data.work_type == 'watch'?'ساعت محور':'زمان محور', field:'work_type',action:''},
			{title:'ساعت شروع', value:this.data.data.start, field:'start',action:''},
			{title:'ساعت پایان', value:this.data.data.end, field:'end',action:''},
			{title:'موظف کاری', value:this.data.data.force_time, field:'force_time',action:''},
			{title:'اضافه کاری موظفی', value:this.data.data.force_extra_time, field:'force_extra_time',action:''},
			{title:'حداکثر زمان کار', value:this.data.data.max_time, field:'max_time',action:''},
		]
	}
	
	getInsurance() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'روز', value:this.data.data.complete_day, field:'complete_day',action:''},
			{title:'غیبت مجاز', value:this.data.data.allowed_delay, field:'allowed_delay',action:''},
			{title:'حق بیمه', value:this.data.data.all_share, field:'all_share',action:''},
			{title:'سهم کارفرما', value:this.data.data.admin_share, field:'admin_share',action:''},
			{title:'سهم کارمند', value:this.data.data.user_share, field:'user_share',action:''},
			{title:'وضعیت', value:this.data.data.is_active, field:'is_active',action:''},
			{title:'توضیحات', value:this.data.data.description, field:'description',action:''},
		]
	}
	
	getBaseSalary() {
		this.dataSource = [
			{title:'عنوان', value:this.data.data.title, field:'title',action:''},
			{title:'دستمزد روزانه', value:this.data.data.dailyPayment, field:'dailyPayment',action:''},
			{title:'دستمزد ماهانه', value:this.data.data.monthlyPayment, field:'monthlyPayment',action:''},
			{title:'حق مسکن', value:this.data.data.housingPayment, field:'housingPayment',action:''},
			{title:'حق بن', value:this.data.data.subsidy, field:'subsidy',action:''},
			{title:'حق اولاد', value:this.data.data.childPayment, field:'childPayment',action:''},
			{title:'علی الحساب سنوات', value:this.data.data.interim_interest, field:'interim_interest',action:''},
			{title:'ایاب ذهاب', value:this.data.data.transportation, field:'transportation',action:''},
		]
	}
}
