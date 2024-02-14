import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { DateService } from "../../../../services/date.service";
import { EditLogComponent } from "../../../../shared/dialog/edit-log/edit-log.component";
import { MatDialog } from "@angular/material/dialog";
import { EditStringComponent } from "../../../../shared/dialog/editUser/edit-string/edit-string.component";
import { JobInfoComponent } from "../../../../shared/dialog/job-info/job-info.component";
import { ChangeJobComponent } from "../../../../shared/dialog/change-job/change-job.component";
import { ChangeAvatarComponent } from "../../../../shared/dialog/change-avatar/change-avatar.component";

const defaultImg = `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`

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
	done = false;
	user: any;
	national_code: number;
	displayedColumns: string[] = ['title', 'value', 'action'];
	dataSource: any;
	personal_data: any;
	complete_data: any;
	job_data: any;
	contact_info:any;
	address_info:any;
	insurance_info:any;
	bank_info:any;
	experiment_info:any;
	guarantee_info:any;
	userImg: any;
	userImgFull:any;
	user_id:any;
	employee_id:any;
	job_id:any;
	constructor(private route: ActivatedRoute, private http: UsersHttpService,private date:DateService,public dialog: MatDialog,) {
		this.national_code = Number(this.route.snapshot.paramMap.get('NCode')) ?? 0
		this.dataSource = [
			{title: 'نام', value: 'امید', action: 'edit'},
			{title: 'نام خانوادگی', value: 'بیات', action: 'edit'},
			{title: 'نام پدر', value: 'اسماعیل', action: 'edit'},
			{title: 'کد ملی', value: '5840039543', action: 'edit'},
		]
	}
	
	ngOnInit() {
		this.getUsers();
	}
	
	getUsers() {
		this.http.getUsers({national_code: this.national_code, gImg: true}).subscribe({
			next: (data: any) => {
				data = data[0];
				this.user_id = data._id;
				this.userImg = data.userImage[0]?.mini ?? defaultImg;
				this.userImgFull = data.userImage[0]?.full ?? defaultImg;
				this.user = data.name + " " + data.last_name
				this.personal_data = [
					{title: 'نام', value: data.name, field: 'name', action: 'edit', validators:['persianString'],fieldType:'string'},
					{title: 'نام خانوادگی', value: data.last_name, field: 'last_name', action: 'edit', validators:['persianString'],fieldType:'string'},
					{title: 'نام پدر', value: data.father, field: 'father', action: 'edit', validators:['persianString'],fieldType:'string'},
					{title: 'کد ملی', value: data.national_code, field: 'national_code', action: 'edit', validators:['nationalCode'],fieldType:'number'},
				]
				this.complete_data = [
					{title: 'مدرک', value: data.education, field: 'education', action: 'edit', validators:['string'],fieldType:'string',},
					{title: 'شماره شناسنامه', value: data.national_code, field: 'national_code', action: 'edit', validators:['number'],fieldType:'number'},
					{title: 'پایان خدمت', value: data.military_service, field: 'military_service', action: 'edit', validators:['required'],fieldType:'select',fieldValue:[{title:'دارد' , value:true },{title:'ندارد' , value:false }]},
					{title: 'متاهل', value: data.marital_status, field: 'marital_status', action: 'edit', validators:['required'],fieldType:'select', fieldValue:[{title:'متاهل' , value:true },{title:'مجرد' , value:false }]},
					{title: 'وضعیت کلی کاربر', value: data.is_active, field: 'is_active', action: 'edit', validators:['required'],fieldType:'select', fieldValue:[{title:'فعال' , value:'active' },{title:'غیرفعال' , value:'disable' }]},
				]
				if (data.marital_status)
					this.complete_data.push({title: 'تعداد فرزند', value: data.child.toString(), field: 'child', action: 'edit', validators:['number'],fieldType:'number'},)
				
				this.job_data = [];
				for (let job of data.jobs_id){
					let temp = [
						{title: 'کد پرسنلی', value: job.personal_code, field: 'personal_code', action: '', validators:['number'],fieldType:'number',job_id:job._id, ref:'job'},
						{title: 'شناسه تردد', value: job.device_id, field: 'device_id', action: '', validators:['number'],fieldType:'number',job_id:job._id, ref:'job'},
						{title: 'ایمیل سازمانی', value: job.companyMail??'', field: 'companyMail', action: 'edit', validators:['email'],fieldType:'string',job_id:job._id, ref:'job'},
						{title: 'شروع به کار', value:this.date.dateInfo(+ new Date(job.start_work)).date , field: 'start_work', action: 'edit', validators:['required'],fieldType:'string',job_id:job._id, ref:'job'},
						{title: 'شرکت', value: job.company_info.title, field: 'company_info', action: 'edit', data:job.company_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'قسمت', value: job.collection_info.title, field: 'collection_info', action: 'edit', data:job.collection_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'بخش', value: job.part_info.title, field: 'part_info', action: 'edit', data:job.part_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'رده', value: job.rank_info.title, field: 'rank_info', action: 'edit', data:job.rank_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'بیمه', value: job.insurance_info.title, field: 'insurance_info', action: 'edit', data:job.insurance_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'پایه حقوق', value: job.baseSalary_info.title, field: 'baseSalary_info', action: 'edit', data:job.baseSalary_info,fieldType:'',shiftInfo:job.shift_info,job_id:job._id, ref:'job'},
						{title: 'شیفت', value: job.shift_info.title, field: 'shift_info', action: 'edit', data:job.shift_info,fieldType:'',job_id:job._id, ref:'job'},
						{title: 'افزایش حقوق', value: (job.increaseSalary ?? 0), field: 'increaseSalary', action: 'edit', validators:['number'],fieldType:'currency',job_id:job._id, ref:'job'},
						{title: 'کاهش حقوق', value: (job.decreaseSalary ?? 0), field: 'decreaseSalary', action: 'edit', validators:['number'],fieldType:'currency',job_id:job._id, ref:'job'},
						{title: 'پاداش ماهانه', value: (job.rewardMonthly ?? 0), field: 'rewardMonthly', action: 'edit', validators:['number'],fieldType:'currency',job_id:job._id, ref:'job'},
						{title: 'فرزندان تحت تکلف', value: (job.dependentChildren?? 0), field: 'dependentChildren', action: 'edit', validators:['number'],fieldType:'number',job_id:job._id, ref:'job'},
						{title: 'وضعیت', value: job.is_active, field: 'is_active', action: 'edit', validators:['required'],fieldType:'select',fieldValue:[{title:'فعال' , value:'active' },{title:'غیرفعال' , value:'disable' }],job_id:job._id, ref:'job'},
					]
					this.job_data.push(temp);
				}
				this.contact_info = [];
				let index =0;
				for(let mob of data.mobile){
					let actions :any= ['edit'];
					if (data.mobile?.length != 1)
						actions.push('delete')
					if (data.mobile?.length == index+1)
						actions.push('insert')
					this.contact_info.push({title:'موبایل', value:mob,action:actions,field:'mobile', validators:['mobile'],fieldType:'number',index:index},)
					index++;
				}
				index =0;
				for(let ph of data.phone){
					let actions :any= ['edit'];
					if (data.phone?.length != 1)
						actions.push('delete')
					if (data.phone?.length == index+1)
						actions.push('insert')
					this.contact_info.push({title:'ثابت', value:ph,action:actions, validators:['phone'],fieldType:'number',index:index},)
					index++;
				}
				index = 0;
				for(let e of data.email){
					let actions :any= ['edit'];
					if (data.email?.length !=1)
						actions.push('delete')
					if (data.email?.length == index+1)
						actions.push('insert')
					this.contact_info.push({title:'ایمیل', value:e,action:actions,validators:['email'],fieldType:'string',index:index},)
					index++;
				}
				
				this.address_info = [];
				let i = 0;
				for (let addr of data.address){
					let temp = [
						{title:'استان', value:addr.province ?? '-' ,field:`address[${i}].province` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'شهر', value:addr.city ?? '-' ,field:`address[${i}].city` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'روستا', value:addr.Village ?? '-' ,field:`address[${i}].Village` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'خیابان', value:addr.street ?? '-' ,field:`address[${i}].street` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'کوچه', value:addr.alley ?? '-' ,field:`address[${i}].alley` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'پلاک', value:addr.Plaque ?? '-' ,field:`address[${i}].Plaque` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'ساختمان', value:addr.building ?? '-' ,field:`address[${i}].building` ,action:'edit',validators:['string'], fieldType:'string'},
						{title:'کد پستی', value:addr.postal_code ,field:`address[${i}].postal_code` ,action:'edit',validators:['nationalCode'], fieldType:'number'},
						{title:'آدرس کامل', value:addr.full_address ?? '-' ,field:`address[${i}].full_address` ,action:'edit',validators:['string'], fieldType:'string'},
					]
					i++;
					this.address_info.push(temp);
				}
				
				this.insurance_info = [
					{title:'وضیت بیمه', value:data.employee_info.insurance_status  ,field:'insurance_status' ,action:'edit', validators:['required'], fieldType:'select',fieldValue:[{title:'دارد' , value:true },{title:'ندارد' , value:false }]},
					{title:'کد بیمه', value:data.employee_info.insurance_code ,field:'insurance_code' ,action:'edit', validators:['number'], fieldType:'number'},
					{title:'روز بیمه ای', value:data.employee_info.insurance_day  ,field:'insurance_day' ,action:'edit', validators:['number'], fieldType:'number'},
					{title:'سابقه بیمه', value:data.employee_info.insurance_history ,field:'insurance_history' ,action:'edit', validators:['required'], fieldType:'select',fieldValue:[{title:'دارد' , value:'دارد' },{title:'ندارد' , value:'ندارد' }]},
				]
				
				this.bank_info = [
					{title:'شماره کارت', value:data.employee_info.bank_card ,field:'bank_card' ,action:'edit', validators:['number'],fieldType:'number'},
					{title:'شماره حساب', value:data.employee_info.bank_account_number ,field:'bank_account_number' ,action:'edit', validators:['number'],fieldType:'number'},
				]
				
				this.experiment_info = [];
				i = 0;
				for (let exp of data.employee_info.experiment){
					let temp:any = [
						{title:'تاریخ',type:'txt', value:this.date.dateInfo(exp.date).date ,field:`experiment[${i}].date` ,action:'delete'},
					]
					let j = 0;
					let temp2 = [];
					for(let img of exp.img){
						temp2.push(
							{title:'تصویر', type:'img' ,mini:img.mini ,full:img.full  ,field:`experiment[${i}].img[${j}]` ,action:'delete'}
						)
						j++;
					}
					temp.push(
					{title:'تصویر', type:'img' ,imgs:temp2}
					)
					i++;
					this.experiment_info.push(temp);
				}

				this.guarantee_info = [];
				i = 0;
				for (let grn of data.employee_info.guarantee){
					let temp:any = [
						{title:'کد',type:'txt', value:grn.code ,field:`guarantee[${i}].code` ,action:'delete'},
					]
					let j = 0;
					let temp2 = [];
					for(let img of grn.img){
						temp2.push(
							{title:'تصویر', type:'img' ,mini:img.mini ,full:img.full  ,field:`guarantee[${i}].img[${j}]` ,action:'delete'}
						)
						j++;
					}
					temp.push(
					{title:'تصویر', type:'img' ,imgs:temp2}
					)
					i++;
					this.guarantee_info.push(temp);
				}
				this.done = true;
			}
		})
	}
	
	edit(title:any,field:any,value:any, ref:string, validate:string[],fieldType:any, fieldValue?:any){
		const dialogRef = this.dialog.open(EditStringComponent, {
			disableClose:true,
			width:'500',
			data: {
				id: this.user_id,
				title:title,
				field:field,
				value:value,
				ref:ref,
				validators:validate,
				fieldType:fieldType,
				fieldValue:fieldValue
			},
		})
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'success')
				this.getUsers();
		});
	}
	
	jobInfo(element:any){
		const dialogRef = this.dialog.open(JobInfoComponent, {
			width:'700',
			data: element
		})
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'success')
				this.getUsers();
		});
	}
	editJob(element:any){
		if (element.fieldType == ''){
			const dialogRef = this.dialog.open(ChangeJobComponent, {
				width:'700',
				data: element
			})
			dialogRef.afterClosed().subscribe(result => {
				if (result == 'success')
					this.getUsers();
			});
		}
		else{
			const dialogRef = this.dialog.open(EditStringComponent, {
				disableClose:true,
				width:'500',
				data: element,
			})
			dialogRef.afterClosed().subscribe(result => {
				if (result == 'success')
					this.getUsers();
			});
		}
	}
	
	changeAvatar(){
		const dialogRef = this.dialog.open(ChangeAvatarComponent, {
			width:'700',
			data: {
				img:this.userImgFull,
				id:this.user_id
			}
		})
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'success')
				this.getUsers();
		});
	}
	
	protected readonly Number = Number;
}
