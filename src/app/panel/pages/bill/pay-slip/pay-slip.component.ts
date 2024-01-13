import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from "../../../../HttpServices/users-http.service";

@Component({
	selector: 'app-pay-slip',
	templateUrl: './pay-slip.component.html',
	styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {
	displayedColumns: string[] = ['user', 'personal_code', 'baseSalary', 'housingPayment', 'subsidy', 'childPayment',
		'interim_interest', 'insurance', 'extra_work', 'interim_interest_reward', 'transportation', 'total_day_work',
		'weak_hour_work', 'holiday_work', 'night_work', 'helpful', 'loan'];
	displayedColumnsName: string[] = ['کاربر', 'کدپرسنلی', 'حقوق پایه', 'حق مسکن', 'حق بن', 'حق اولاد',
		'علی الحساب سنوات', 'حق بیمه', 'اضافه کار', 'علی الحساب عیدی', 'ایاب ذهاب', 'کارکرد موثر',
		'ساعت کار هفته', 'تعطیل کاری', 'شب کاری', 'مساعده', 'وام'];
	
	dataSource: any;
	allCourses: any = [];
	selectCourses: any;
	selectCourse: any;
	
	constructor(private http: UsersHttpService) {
	}
	
	ngOnInit() {
		this.getCourses()
	}
	
	getCourses(param?: any) {
		this.http.getWorkReport().subscribe({
			next: (data: any) => {
				data = data.reports
				if (this.allCourses.length) {
					this.selectCourses = data;
					for (let record of this.selectCourses) {
						this.fillData(record)
					}
				} else {
					data.forEach((data: any) => {
						!this.allCourses.includes(data.title) ? this.allCourses.push(data.title) : '';
					})
				}
			}
		})
		
	}
	
	async fillData(row: any) {
		await this.http.getJob({personal_code: row.personal_code}).subscribe((data: any) => {
			row.baseInfo = data[0];
			this.calcBase(row)
			
		})
	}
	
	calcBase(row: any) {
		console.log(row)
		let basePayment = row.baseInfo.baseSalary_info.monthlyPayment ?? 0;
		let bon = row.baseInfo.baseSalary_info.subsidy ?? 0;
		let housing = row.baseInfo.baseSalary_info.housingPayment ?? 0;
		let children = row.baseInfo.baseSalary_info.childPayment ?? 0;
		let interim_interest = row.baseInfo.baseSalary_info.interim_interest ?? 0;
		let transportation = row.baseInfo.baseSalary_info.transportation ?? 0;
		let reward = row.baseInfo.rewardMonthly ?? 0;
		let increaseSalary = row.baseInfo.increaseSalary ?? 0;
		let decreaseSalary = row.baseInfo.decreaseSalary ?? 0;
		let baseSalary = 0;
		baseSalary += basePayment
		baseSalary += reward
		baseSalary += increaseSalary
		baseSalary -= decreaseSalary;
		let workTime = row.baseInfo.shift_info.force_time;
		let dailyPayment = baseSalary / 30;
		let hourPayment = dailyPayment / workTime;
		let extra = (dailyPayment / 7.33) * 1.4;
		
		let baseMonthWorkPayment = dailyPayment * (row.info.total_day-row.info.holidays + 4);
		console.log(baseMonthWorkPayment);
	}
	
}
