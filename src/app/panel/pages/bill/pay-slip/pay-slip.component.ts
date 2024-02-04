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

@Component({
	selector: 'app-pay-slip',
	templateUrl: './pay-slip.component.html',
	styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {
	displayedColumns: string[] = ['user', 'personal_code', 'baseSalary', 'housingPayment', 'subsidy', 'childPayment',
		'interim_interest', 'insurance', 'extra_work', 'extra_work_payment', 'interim_interest_reward', 'transportation', 'total_day_work', 'absent_days',
		'total_extra_work', 'weak_hour_work', 'holiday_work', 'night_work', 'helpful', 'sum', 'reduce', 'payment'];
	displayedColumnsName: string[] = ['کاربر', 'کدپرسنلی', 'حقوق پایه', 'حق مسکن', 'حق بن', 'حق اولاد',
		'علی الحساب سنوات', 'حق بیمه', ' کل اضافه کار', 'کل تاخیر', 'مبلغ اضافه کار', 'علی الحساب عیدی', 'ایاب ذهاب', 'کارکرد موثر', 'غیبت', 'ساعت اضافه کار', 'مقدار تاخیر',
		'ساعت کار هفته', 'تعطیل کاری', 'شب کاری', 'مساعده', 'مجموع', 'کسورات', 'پرداختی'];
	
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
	) {
	}
	
	ngOnInit() {
		if (this.Report.report().title) {
			this.report_data = this.Report.report();
			this.displayedColumns = this.report_data.cols
		} else {
			this.route.navigate(['panel/report/reports']).then(() => {
				this._snackBar.openFromComponent(SnackbarComponent, {
					data: `ابتدا نوع گزارش را انتخاب نمایید`,
					duration: 1500
				})
			})
		}
		this.getCourses()
	}
	
	getCourses(param?: any) {
		
		this.http.getWorkReport(param).subscribe({
			next: (data: any) => {
				data = data.reports
				if (this.allCourses.length) {
					this.selectCourses = data;
					this.dataSource = [];
					for (let record of this.selectCourses) {
						this.fillData(record)
					}
				} else {
					data.forEach((data: any) => {
						!this.allCourses.includes(data.title) ? this.allCourses.push(data.title) : '';
					})
				}
			}
		});
	}
	
	async fillData(row: any) {
		await this.http.getJob({personal_code: row.personal_code}).subscribe((data: any) => {
			row.baseInfo = data[0];
			this.dataSource.push(this.calcBase(row));
			if (this.table)
				this.table.renderRows();
			
		})
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
	
	calcBase(row: any) {
		let basePayment = row.baseInfo.baseSalary_info.monthlyPayment ?? 0;
		let bon = row.baseInfo.baseSalary_info.subsidy ?? 0;
		let housing = row.baseInfo.baseSalary_info.housingPayment ?? 0;
		let children = row.baseInfo.baseSalary_info.childPayment ?? 0;
		let interim_interest = row.baseInfo.baseSalary_info.interim_interest ?? 0;
		let transportation = row.baseInfo.baseSalary_info.transportation ?? 0;
		let reward = row.baseInfo.rewardMonthly ?? 0;
		let increaseSalary = row.baseInfo.increaseSalary ?? 0;
		let decreaseSalary = row.baseInfo.decreaseSalary ?? 0;
		let endPay = 0;
		let baseSalary = 0;
		baseSalary += basePayment;
		baseSalary += increaseSalary;
		baseSalary -= decreaseSalary;
		this.report_data.reward_effect == 'onBase' ?
			baseSalary += (row.baseInfo.rewardMonthly ?? 0)
			: this.report_data.reward_effect == 'onPay' ?
				endPay += (row.baseInfo.rewardMonthly ?? 0) : ''
		let workTime = row.baseInfo.shift_info.force_time;
		let dailyPayment = baseSalary / 30;
		let hourPayment = dailyPayment / workTime;
		let extra = (dailyPayment / 7.33) * 1.4;
		let baseMonthWorkPayment = (dailyPayment) * (row.info.total_day + row.info.holidays - row.info.holiday_work);
		let extraWork = extra * row.info.total_extra;
		let delayWork = extra * row.info.total_delay;
		let advantages = housing + bon;
		let child = +row.baseInfo.user_id.child * children;
		let traffic = transportation * row.info.total_day;
		let insurance = ((basePayment + advantages) / 100) * (row.baseInfo?.insurance_info?.user_share ?? 0);
		
		////////////////////////////////////////////////////////////////////////////////////////
		
		let effective = this.report_data.cols;
		let data: any = {};
		data.payment = 0;
		data.user = row.baseInfo.user_id.name + ' ' + row.baseInfo.user_id.last_name;
		data.personal_code = row.personal_code;
		data.total_day_work = row.info.total_day;
		data.absent_days = row.info.absent_days;
		data.total_extra_work = row.info.total_extra;
		data.total_delay_work = row.info.total_delay;
		data.holiday_work = row.info.holiday_work;
		data.baseSalary = baseSalary.toFixed(2);
		data.extra_work_payment = extra.toFixed(2);
		data.extra_work = extraWork.toFixed(2);
		data.delay_work = delayWork.toFixed(2);
		data.housingPayment = housing.toFixed(2);
		data.subsidy = bon.toFixed(2);
		data.childPayment = child.toFixed(2);
		data.transportation = traffic.toFixed(2);
		data.interim_interest = this.date.dateInfo(+Date.now()).year - this.date.dateInfo(+new Date(row.baseInfo.start_work)).year > 0 ?
			row.baseInfo.baseSalary_info.interim_interest * row.info.all_day : 0;
		data.interim_interest_reward = Math.round(((dailyPayment * 60) / 12) * ((row.info.total_day + row.info.holidays - row.info.holiday_work) / row.info.all_day));
		data.insurance = insurance;
		data.helpful = row.baseInfo?.helpful ?? 0
		let sum = 0;
		if (effective.includes('baseSalary'))
			sum += +baseMonthWorkPayment;
		
		if (effective.includes('extra_work'))
			sum += +data.extra_work;
		
		if (effective.includes('housingPayment'))
			sum += +data.housingPayment;
		
		if (effective.includes('subsidy'))
			sum += +data.subsidy;
		
		if (effective.includes('childPayment'))
			sum += +data.childPayment;
		
		if (effective.includes('interim_interest'))
			sum += +data.interim_interest;
		
		if (effective.includes('interim_interest_reward'))
			sum += +data.interim_interest_reward;
		
		if (effective.includes('transportation'))
			sum += +data.transportation;
		data.sum = +sum.toFixed(2);
		
		let reduce = 0;
		
		if (effective.includes('insurance'))
			reduce += +data.insurance;
		
		if (effective.includes('helpful'))
			reduce += +data.helpful;
		
		if (effective.includes('delay_work')) {
			reduce += +data.delay_work;
			console.log(data.delay_work)
		}
		
		data.reduce = +reduce.toFixed(2);
		
		data.payment = endPay + data.sum - data.reduce;
		if (this.report_data.max) {
			if (data.payment - data.extra_work > this.report_data.max) {
				data.payment -= data.extra_work;
				data.sum -= data.extra_work;
				data.extra_work = 0;
				data.total_extra_work = 0;
			}
			while (data.payment > this.report_data.max) {
				while (data.payment > this.report_data.max && data.extra_work > 0 && data.extra_work - data.extra_work_payment > 0) {
					data.extra_work -= data.extra_work_payment;
					data.total_extra_work -= 1;
					data.payment -= data.extra_work_payment;
					data.sum -= data.extra_work_payment;
				}
				if (data.extra_work - data.extra_work_payment < 0) {
					data.extra_work = 0;
					data.total_extra_work = 0;
					data.payment -= data.extra_work;
					data.sum -= data.extra_work;
				}
				while (data.payment > this.report_data.max && baseMonthWorkPayment > 0 && baseMonthWorkPayment - dailyPayment > 0) {
					data.total_day_work -= 1;
					baseMonthWorkPayment -= dailyPayment;
					data.payment -= dailyPayment;
					data.sum -= dailyPayment;
				}
			}
		}
		data.payment = data.payment.toFixed(2);
		return data;
	}
}