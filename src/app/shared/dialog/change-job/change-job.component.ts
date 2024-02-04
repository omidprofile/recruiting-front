import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ValidationFormService } from "../../../services/validation-form.service";
import { FormValidateService } from "../../../services/form-validate.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersHttpService } from "../../../HttpServices/users-http.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RolesHttpService } from "../../../HttpServices/roles-http.service";
import { RoleFormComponent } from "../../role-form/role-form.component";
import { CreateShiftComponent } from "../create-shift/create-shift.component";
import { BaseSalary } from "../create-baseSalary/base-salary.component";
import { InsuranceComponent } from "../insurance/insurance.component";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
	selector: 'app-change-job',
	templateUrl: './change-job.component.html',
	styleUrls: ['./change-job.component.scss']
})
export class ChangeJobComponent {
	form: FormGroup;
	fields: any = [];
	companies: any
	collections: any
	parts: any
	ranks: any
	insurances: any
	baseSalaries: any
	shifts: any
	
	constructor(
		public dialogRef: MatDialogRef<ChangeJobComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private validator: ValidationFormService,
		public validate: FormValidateService,
		private _snackBar: MatSnackBar,
		private http: RolesHttpService,
		private httpUser: UsersHttpService,
		public dialog: MatDialog,
	) {
		this.form = new FormGroup({
			company: new FormControl(null, [Validators.required]),
			collection: new FormControl(null, [Validators.required]),
			part: new FormControl(null, [Validators.required]),
			rank: new FormControl(null, [Validators.required]),
			baseSalary: new FormControl(null, [Validators.required]),
			insurance: new FormControl(null, [Validators.required]),
			shift: new FormControl(null, [Validators.required]),
		})
		
		if (data.field == 'company_info')
			this.preparingCompany();
		
		if (data.field == 'collection_info')
			this.preparingCollection();
		
		if (data.field == 'part_info')
			this.preparingPart();
		
		if (data.field == 'rank_info')
			this.preparingRank();
		
		if (data.field == 'insurance_info')
			this.preparingInsurance();
		
		if (data.field == 'baseSalary_info')
			this.preparingBaseSalary();
		
		if (data.field == 'shift_info')
			this.preparingShift();
	}
	
	submit(){
		let body :any= {}
		if (this.form.value.company)
			body.company_info = this.form.value.company;
		
		if (this.form.value.collection)
			body.collection_info = this.form.value.collection;
		
		if (this.form.value.part)
			body.part_info = this.form.value.part;
		
		if (this.form.value.rank)
			body.rank_info = this.form.value.rank;
		
		if (this.form.value.shift)
			body.shift_info = this.form.value.shift;
		
		if (this.form.value.baseSalary)
			body.baseSalary_info = this.form.value.baseSalary;
		
		if (this.form.value.insurance)
			body.insurance_info = this.form.value.insurance;
		
		this.httpUser.updateJob({
			id:this.data.job_id,
			data:body
		}).subscribe({
			next:(data)=>{
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `ویرایش با موفقیت انجام شد`,
					duration: 1000
				});
				this.dialogRef.close('success');
			},
			error:(err)=>{
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `ویرایش با خطا مواجه شد`,
					duration: 1000
				});
				console.log(err);
			}
		})
		
		
	}
	
	async preparingCompany() {
		this.fields = [
			'company',
			'collection',
			'part',
			'rank',
			'insurance',
			'shift',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.updateValueAndValidity();
		await this.getCompany();
	}
	
	async preparingPart() {
		this.fields = [
			'part',
			'rank',
			'insurance',
			'shift',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.get('company')?.setValidators([]);
		this.form.get('collection')?.setValidators([]);
		this.form.updateValueAndValidity();
		 await this.getPart();
	}
	
	async preparingCollection() {
		this.fields = [
			'collection',
			'part',
			'rank',
			'insurance',
			'shift',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.get('company')?.setValidators([]);
		this.form.updateValueAndValidity();
		await this.getCollection();
	}
	
	async preparingRank() {
		this.fields = [
			'rank',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.get('part')?.setValidators([]);
		this.form.get('company')?.setValidators([]);
		this.form.get('insurance')?.setValidators([]);
		this.form.get('shift')?.setValidators([]);
		this.form.get('collection')?.setValidators([]);
		this.form.updateValueAndValidity();
		
		await this.getRank();
	}
	
	async preparingShift() {
		this.fields = [
			'shift',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.get('part')?.setValidators([]);
		this.form.get('company')?.setValidators([]);
		this.form.get('insurance')?.setValidators([]);
		this.form.get('rank')?.setValidators([]);
		this.form.get('collection')?.setValidators([]);
		this.form.updateValueAndValidity();
		
		await this.getShift();
	}
	
	async preparingInsurance() {
		this.fields = [
			'insurance',
		];
		this.form.get('baseSalary')?.setValidators([]);
		this.form.get('part')?.setValidators([]);
		this.form.get('company')?.setValidators([]);
		this.form.get('shift')?.setValidators([]);
		this.form.get('rank')?.setValidators([]);
		this.form.get('collection')?.setValidators([]);
		this.form.updateValueAndValidity();
		
		await this.getInsurance();
	}
	
	async preparingBaseSalary() {
		this.fields = [
			'baseSalary',
		];
		this.form.get('company')?.setValidators([]);
		this.form.get('part')?.setValidators([]);
		this.form.get('shift')?.setValidators([]);
		this.form.get('rank')?.setValidators([]);
		this.form.get('collection')?.setValidators([]);
		this.form.get('insurance')?.setValidators([]);
		this.form.updateValueAndValidity();
		
		await this.getBaseSalary();
	}
	
	async getCompany() {
		await this.http.getCompanies().subscribe({
			next: (data: any) => {
				this.companies = data.companies
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	async getCollection() {
		await this.http.getCollection(this.form.value.company ?? this.data.data.company).subscribe({
			next: (data: any) => {
				this.collections = data.collections
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	async getPart() {
		await this.http.getPart(this.form.value.collection ?? this.data.data.parent).subscribe({
			next: (data: any) => {
				this.parts = data.parts
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	async getRank() {
		await this.http.getRank(this.form.value.part ?? this.data.data.part).subscribe({
			next: (data: any) => {
				this.ranks = data.ranks
			},
			error: (err) => {
				console.log(err)
			}
		})
		await this.getShift();
		await this.getInsurance();
	}
	
	async getShift() {
		await this.http.getShift(this.form.value.part ?? this.data.data.part).subscribe({
			next: (data: any) => {
				this.shifts = data.shifts
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	async getBaseSalary() {
		await this.http.getBaseSalary().subscribe({
			next: (data: any) => {
				this.baseSalaries = data.baseSalaries
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	async getInsurance() {
		await this.http.getInsurance(this.form.value.part ?? this.data.data.part).subscribe({
			next: (data: any) => {
				this.insurances = data.insurances
			},
			error: (err) => {
				console.log(err)
			}
		})
	}
	
	openDialog(type: string, title: string, parent?: any, value?: any): void {
		if (type == 'collection')
			parent = this.companies ?this.companies.filter((e: any) => e._id == parent):[{_id:this.data.data.company}];
		if (type == 'part')
			parent = this.collections ?this.collections.filter((e: any) => e._id == parent):[{_id:this.data.data.parent}];
		if (type == 'rank')
			parent = this.parts ?this.parts.filter((e: any) => e._id == parent):[{_id:this.data.data.part}];
		
		const dialogRef = this.dialog.open(RoleFormComponent, {
			data: {type: type, parent: parent, title: title, value: value},
		});
		
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result.created) {
				if (type == 'company')
					await this.getCompany()
				if (type == 'collection')
					await this.getCollection()
				if (type == 'part')
					await this.getPart()
				if (type == 'rank')
					await this.getRank()
			}
		});
	}
	
	createShift() {
		const dialogRef = this.dialog.open(CreateShiftComponent, {
			data: {part: (this.form.value.part ?? this.data.data.part)},
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result.created)
				await this.getShift()
		})
	}
	
	createBaseSalary() {
		let shift =this.shifts? this.shifts.filter((e: any) => {
			if (e._id == this.form.value.shift)
				return e
		}):undefined;
		const dialogRef = this.dialog.open(BaseSalary, {
			data: {part: this.form.value.part, shift: (shift ?? [this.data.shiftInfo])},
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result.created)
				await this.getBaseSalary()
		})
	}
	
	createInsurance() {
		const dialogRef = this.dialog.open(InsuranceComponent, {
			data: {part: (this.form.value.part?? this.data.data.part)},
		});
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result.created)
				await this.getInsurance()
		})
	}
}
