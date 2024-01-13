import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateService } from "../../../../services/date.service";
import { AttendanceService } from "../../../../HttpServices/attendance.service";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { ReportsService } from "../../../../services/reports.service";
import { Router } from "@angular/router";
import { CalendarHttpService } from "../../../../HttpServices/calendar-http.service";
import { CalendarService } from "../../../../services/calendar.service";


@Component({
	selector: 'app-attendance-info',
	templateUrl: './attendance-info.component.html',
	styleUrls: ['./attendance-info.component.scss']
})
export class AttendanceInfoComponent implements OnInit {
	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	
	constructor(private date: DateService, private httpAttendance: AttendanceService,
	            private http: UsersHttpService, private _snackBar: MatSnackBar,
	            public Report: ReportsService,
	            private route: Router,
	            private calendar: CalendarHttpService,
	            private PCalendar:CalendarService
	) {
	}
	
	options: any;
	filteredOptions: any[];
	user: any;
	month: any;
	year: any;
	day: any;
	user_info: any;
	holidays = 0;
	holiday_work =0;
	work_days = 0;
	total_work = 0;
	absent_day = 0;
	present_day = 0;
	total_day = 0;
	report_data: any;
	
	async ngOnInit() {
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
		let today = this.date.dateInfo(Date.now())
		this.year = today.year;
		this.month = today.month
		await this.getUsers()
	}
	
	displayedColumns: string[] = ['day', 'date', 'day_status', 'traffic1', 'traffic2', 'traffic3', 'traffic4', 'traffic5', 'traffic6', 'traffic7', 'traffic8', 'user_status', 'conflict', 'time'];
	displayedColumnsPersian: string[] = ['روز', 'تاریخ', 'وضعیت روز', 'تردد1', 'تردد2', 'تردد3', 'تردد4', 'تردد5', 'تردد6', 'تردد7', 'تردد8', 'وضعیت کاربر', 'اعتبار', 'کارکرد'];
	dataSource: any = [];
	
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
	
	getUsers() {
		this.http.getUsers().subscribe((data: any) => {
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
	
	filter(): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
	}
	
	setUser(id: any) {
		this.user = id
	}
	
	async submit() {
		this.work_days = 0;
		this.total_work = 0;
		this.holiday_work =0;
		this.holidays = 0;
		this.absent_day = 0;
		this.present_day = 0;
		this.total_day = 0;
		this.dataSource = []
		this.user_info = undefined;
		let currentDate = "";
		let today = this.date.dateInfo(Date.now())
		if (!this.year && !this.month) {
			currentDate = today.date
		} else {
			currentDate += (this.year ? `${this.year}/` : `${today.year}/`);
			currentDate += (this.month ? `${this.month}/` : `${today.month}/`);
			currentDate += '1'
		}
		await this.httpAttendance.getAttendances({
			year: currentDate.split('/')[0],
			month: currentDate.split('/')[1],
			user: this.user,
			type: 'report'
		}).subscribe({
			next: async (data: any) => {
				data = data.data;
				if (!Object.keys(data).length) {
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `کاربر فاقد فعالیت در دوره ی انتخابی است`,
						duration: 3000
					})
				} else {
					await this.PCalendar.preparingDay(this.year,this.month,currentDate).then((ds: any) => {
						data = Object.values(data)[0];
						setTimeout(() => {
							for (let row of ds[0]) {
								this.total_day++;
								row.conflict = false
								let traffics: any = Object.keys(data).filter(key => key == row.date)
								traffics.length ? row.user_status = 'present' : row.user_status = 'absent';
								traffics.length && row.day_status != 'holiday'? this.present_day++ : '';
								row.day_status =='normal' && !traffics.length?this.absent_day++:'';
								traffics.length && row.day_status == 'holiday' ? this.holiday_work++ : '';
								let i = 1;
								traffics.length ? traffics = data[traffics[0]] : traffics = [];
								for (let traffic of traffics) {
									let day = traffic?.date?.day;
									row[`traffic${i}`] = {
										time: traffic.date?.time,
										type: traffic?.acceptedType
									}
									traffic.duration ? row.time = traffic.duration : ''
									traffic.duration && row.day_status != 'holiday' ? this.total_work += +traffic.duration : ''
									if (traffic.conflict == true) {
										row.conflict = true
									}
									i++;
								}
							}
							this.user_info = this.filteredOptions.filter((e: any) => {
								return e.id == this.user
							})
							this.user_info = this.user_info[0]
							this.holidays = ds[1].holidays;
							this.work_days = ds[1].work_days;
							this.dataSource = ds[0];
						})
					})
					
				}
			},
			error: (err: any) => {
			},
		})
	}
}
