import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { ReportsService } from "../../../../services/reports.service";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DateService } from "../../../../services/date.service";
import { MatTable } from "@angular/material/table";
import { PeriodicElement } from "../../users/users-list/users-list.component";
import { ManualAttendanceComponent } from "../../../../shared/dialog/manual-attendance/manual-attendance.component";
import { PaySlipInfoComponent } from "../../../../shared/dialog/pay-slip-info/pay-slip-info.component";
import { PrintService } from "../../../../services/print.service";

@Component({
	selector: 'app-pay-slip',
	templateUrl: './pay-slip.component.html',
	styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {
	/*	displayedColumns: string[] = ['user', 'personal_code', 'baseSalary', 'housingPayment', 'subsidy', 'childPayment',
			'interim_interest', 'insurance', 'extra_work', 'extra_work_payment', 'interim_interest_reward', 'transportation', 'total_day_work', 'absent_days',
			'total_extra_work', 'weak_hour_work', 'holiday_work', 'night_work', 'increases','decreases', 'sum', 'reduce', 'payment'];
		displayedColumnsName: string[] = ['کاربر', 'کدپرسنلی', 'حقوق پایه', 'حق مسکن', 'حق بن', 'حق اولاد',
			'علی الحساب سنوات', 'حق بیمه', ' کل اضافه کار', 'کل تاخیر', 'مبلغ اضافه کار', 'علی الحساب عیدی', 'ایاب ذهاب', 'کارکرد موثر', 'غیبت', 'ساعت اضافه کار', 'مقدار تاخیر',
			'ساعت کار هفته', 'تعطیل کاری', 'شب کاری', 'سایر اضافات','سایر کسورات', 'مجموع', 'کسورات', 'پرداختی'];*/
	displayedColumns: any = ['No', 'user', 'personal_code', 'baseSalary', 'extraSalary','present','absent', 'extraTime', 'delayTime', 'requireIncrease', 'requireDecrease', 'increases', 'decreases', 'payment','action']
	dataSource: any;
	allCourses: any = [];
	selectCourses: any;
	selectCourse: any;
	report_data: any;
	@ViewChild(MatTable) table: MatTable<PeriodicElement>;
	
	constructor(private http: UsersHttpService,
	            public Report: ReportsService,
	            public dialog: MatDialog,
	            private route: Router,
	            private _snackBar: MatSnackBar,
	            private date: DateService,
	            private printer:PrintService,
	) {
	}
	
	ngOnInit() {
		if (this.Report.report().title) {
			this.report_data = this.Report.report();
			// this.displayedColumns = this.report_data.cols
		} else {
			this.route.navigate(['panel/report/reports']).then(() => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `ابتدا نوع گزارش را انتخاب نمایید`,
					duration: 1500
				})
			})
		}
		this.getCourses()
		 let lastTitle = localStorage.getItem('title')
		if (lastTitle){
			this.calculate({title:lastTitle})
			this.selectCourse = lastTitle
		}
	}
	
	createHour(hour: any) {
		if (!hour)
			return ' -- : -- : -- '
		let result = Math.floor(hour) + ":"
		let min = hour - Math.floor(hour);
		min = min * 60;
		result = result + (min == 0 ? "00:" : Math.floor(min) + ":")
		let sec = min - Math.floor(min)
		sec = sec * 60;
		result = result + (sec == 0 ? "00" : Math.floor(sec))
		return result
	}
	
	
	getCourses(param?: any) {
		this.http.getWorkReport().subscribe({
			next: (data: any) => {
				data = data.reports
				data.forEach((data: any) => {
					!this.allCourses.includes(data.title) ? this.allCourses.push(data.title) : '';
				})
			}
		});
	}
	
	calculate(item: any) {
		localStorage.setItem('title',item.title)
		let body: any = {};
		body.title = item.title;
		body.report = this.report_data;
		this.http.calculate(body).subscribe({
			next: (data: any) => {
				data = data.result;
				this.dataSource = [];
				for(item of data){
					let temp:any={};
					temp.sumInfo = [
						{title: 'حقوق ثابت',price:item.baseMonthWorkPayment ?? 0},
						{title: 'اضافه کار',price:item.extra_work ?? 0},
						{title: 'حق مسکن',price:item.housingPayment ?? 0},
						{title: 'حق عائله مندی',price:item.childPayment ?? 0},
						{title: 'بن',price:item.subsidy ?? 0},
						{title: 'علی الحساب ماهانه',price:item.interim_interest ?? 0},
						{title: 'علی الحساب عیدی',price:item.interim_interest_reward ?? 0},
						{title: 'ایاب ذهاب',price:item.transportation ?? 0},
						{title: 'پاداش',price:item.endPay ?? 0},
						
					];
					temp.reduceInfo = [
						{title: 'بیمه',price:item.insurance},
						{title: 'کسر کار',price:item.delay_work ?? 0},
						{title: 'هزینه غذا',price: 0}
					];
					temp.increasesInfo = [];
					temp.decreasesInfo =[];
					if (item.increases_info){
						for(let inc of item.increases_info){
							temp.sumInfo.push({title:inc.title, price:inc.price})
							temp.increasesInfo.push({title:inc.title, price:inc.price})
						}
					}
					if(item.decreases_info){
						for(let dec of item.decreases_info){
							temp.reduceInfo.push({title:dec.title, price:dec.price})
							temp.decreasesInfo.push({title:dec.title, price:dec.price})
						}
					}
					temp.conflict = item.conflict
					temp.gender = item.gender;
					temp.child = item.child;
					temp.dailySalary = item.dailySalary;
					temp.date = item.date;
					temp.user = item.user;
					temp.personal_code = item.personal_code;
					temp.baseSalary = item.baseSalary;
					temp.extraSalary = item.extra_work_payment;
					temp.present = item.present_day;
					temp.absent = item.absent_days;
					temp.extraTime = item.total_extra_work;
					temp.delayTime = item.total_delay_work;
					temp.requireIncrease = item.increases ?? 0;
					temp.requireDecrease = item.decreases ?? 0;
					temp.increases = item.sum;
					temp.decreases = item.reduce;
					temp.payment = item.payment
					this.dataSource.push(temp);
				}
			},
			error: (err: any) => {
				console.log(err)
			},
		})
	}
	
	
	seeInfo(info:any){
		const dialogRef = this.dialog.open(PaySlipInfoComponent, {
			width:'500px',
			direction:"rtl",
			data: info,
			hasBackdrop:true,
		})
		dialogRef.afterClosed().subscribe(async (result) => {
			if (result == 'success') {
			
			}
		});
	}
	
	print(element:any){
	this.printer.set(element);
	this.route.navigate(['/print/paySlip'])
	}
	
	seeMonthInfo(element:any){
		// this.route.navigate(['/panel/report/workInfo'],{queryParams:{
		// 	user:element.personal_code,
		// 		year:element.date.year,
		// 		month:element.date.month
		// 	}})
	}
}