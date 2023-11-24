import {Component, Inject, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidateService } from "../../services/form-validate.service";
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from "@angular/cdk/stepper";
import { map, Observable } from "rxjs";
import { BreakpointObserver } from "@angular/cdk/layout";
import { ValidationFormService } from "../../services/validation-form.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "src/app/services/material.persian-date.adapter.service";
@Component({
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			},
		},
		{ provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
	],
})
export class EmployeeFormComponent {
	
	baseInfo: FormGroup
	employeeInfo: FormGroup
	stepperOrientation: Observable<StepperOrientation>;


	
	constructor(public validate: FormValidateService,
				breakpointObserver: BreakpointObserver,
				private validator:ValidationFormService,
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
		this.baseInfo = new FormGroup({
			person: new FormGroup({
				name: new FormControl(null, [Validators.required,
					this.validator.length.bind(this),
					this.validator.persianString.bind(this)]),
				last_name: new FormControl(null, [Validators.required,
					this.validator.length.bind(this),
					this.validator.persianString.bind(this)]),
				father: new FormControl(null, [Validators.required,
					this.validator.length.bind(this),
					this.validator.persianString.bind(this)]),
				gender: new FormControl(null, [Validators.required]),
				national_code: new FormControl(null, [Validators.required,
					this.validator.number.bind(this), this.validator.nationalCode.bind(this)]),
				certificate_code: new FormControl(null, [Validators.required,
					this.validator.number.bind(this)]),
				birth_day:new FormControl(null, [Validators.required]),
				children:new FormControl(null,
					[Validators.required,validator.number.bind(this)]),
				marital_status:new FormControl(null,[Validators.required]),
				military_service:new FormControl(null,[Validators.required]),
			}),
			connection: new FormGroup({
				mobile: new FormArray([
					new FormControl(null, [Validators.required, this.validator.mobile.bind(this)]),
				]),
				phone: new FormArray([
					new FormControl(null, [Validators.required, this.validator.phone.bind(this)])
				]),
				email: new FormArray([
					new FormControl(null, [Validators.required, Validators.email])
				]),
			}),
			
			address:new FormGroup({
				province:new FormControl(null , [Validators.required,]),
				city:new FormControl(null , [Validators.required,]),
				Village:new FormControl(null , [Validators.required,]),
				street:new FormControl(null, [Validators.required]),
				alley:new FormControl(null, [Validators.required]),
				Plaque:new FormControl(null, [Validators.required]),
				building:new FormControl(null, [Validators.required]),
				postal_code:new FormControl(null, [Validators.required,
					this.validator.number.bind(this),
					this.validator.nationalCode.bind(this)
				]),
				full_address:new FormControl(null, [Validators.required])
				
			}),
			
			is_active: new FormControl(null, [Validators.required]),
		})
		this.employeeInfo = new FormGroup({
			job:new FormGroup({
				section:new FormControl(null, [Validators.required]),
				sector:new FormControl(null, [Validators.required]),
				rank:new FormControl(null, [Validators.required]),
				title:new FormControl(null, [Validators.required]),
				start:new FormControl(null,[Validators.required]),
				education: new FormControl(null,[Validators.required, validator.persianString.bind(this)]),
				personal_code:new FormControl(null, [Validators.required,validator.number.bind(this)]),
				is_active: new FormControl(null,[Validators.required])
			}),
			insurance:new FormGroup({
				status:new FormControl(null, [Validators.required]),
				per_month:new FormControl(null, [Validators.required, validator.number.bind(this)]),
				history:new FormControl(null,[Validators.required]),
				start:new FormControl(null, [Validators.required]),
				code:new FormControl(null, [Validators.required, validator.number.bind(this)]),
			}),
			bank:new FormGroup({
				account:new FormControl(null, [Validators.required,validator.number.bind(this)]),
				card:new FormControl(null, [Validators.required, validator.number.bind(this)])
			}),
			experiment:new FormGroup({
				status:new FormControl(null,[Validators.required]),
				date:new FormControl(null,[Validators.required]),
				img:new FormControl(null,[Validators.required])
			}),
			guaranty:new FormGroup({
				code:new FormControl(null,[Validators.required]),
				img:new FormControl(null,[Validators.required]),
			}),
		})
	}


	get job(){
		return this.employeeInfo.get('job') as FormGroup
	}

	get insurance(){
		return this.employeeInfo.get('insurance') as FormGroup

	}

	get bank(){
		return this.employeeInfo.get('bank') as FormGroup

	}


	get person() {
		return this.baseInfo.get('person') as FormGroup;
	}
	
	get connection() {
		return this.baseInfo.get('connection') as FormGroup;
	}
	
	get address(){
		return this.baseInfo.get('address') as FormGroup;
	}
	
	get mobile() {
		return this.connection.get('mobile') as FormArray;
	}
	
	get phone() {
		return this.connection.get('phone') as FormArray;
	}
	get email() {
		return this.connection.get('email') as FormArray;
	}
	
	public addMobile() {
		const add = this.connection.get('mobile') as FormArray;
		add.push(new FormControl(null, [Validators.required, this.validator.mobile.bind(this)]));
	}
	
	public removeMobile(i: number) {
		const remove = this.connection.get('mobile') as FormArray
		if (remove.length > 1)
			remove.removeAt(i)
	}
	
	public addPhone() {
		const add = this.connection.get('phone') as FormArray
		add.push(new FormControl(null, [Validators.required, this.validator.phone.bind(this)]))
	}
	
	public removePhone(i: number) {
		const remove = this.connection.get('phone') as FormArray
		if (remove.length > 1)
			remove.removeAt(i)
	}
	
	public addEmail() {
		const add = this.connection.get('email') as FormArray
		add.push(new FormControl(null, [Validators.required, Validators.email]))
	}
	
	public removeEmail(i: number) {
		const remove = this.connection.get('email') as FormArray
		if (remove.length > 1)
			remove.removeAt(i)
	}
	
	test(){
		console.log(this.baseInfo)
	}
	
	onSubmit() {
	
	}
	
	
}
