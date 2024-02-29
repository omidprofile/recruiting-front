import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateService } from "../../../../services/date.service";
import { AttendanceService } from "../../../../HttpServices/attendance.service";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { ReportsService } from "../../../../services/reports.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CalendarHttpService } from "../../../../HttpServices/calendar-http.service";
import { CalendarService } from "../../../../services/calendar.service";
import { EditLogComponent } from "../../../../shared/dialog/edit-log/edit-log.component";
import { MatDialog } from "@angular/material/dialog";
import { ManualAttendanceComponent } from "../../../../shared/dialog/manual-attendance/manual-attendance.component";


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
	            public dialog: MatDialog,
	            private routeData:ActivatedRoute
	) {
	}
	
	progress = true;
	options: any;
	filteredOptions: any[];
	user: any;
	month: any;
	year: any;
	day: any;
	user_info: any;
	holidays = 0;
	holiday_work = 0;
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
		if (this.routeData.snapshot.queryParams['user']){
			this.user = this.routeData.snapshot.queryParams['user'];
			this.year = this.routeData.snapshot.queryParams['year'];
			this.month = this.routeData.snapshot.queryParams['month'];
			await this.submit();
		}
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
		this.http.getJob().subscribe((data: any) => {
			this.options = []
			for (let item of data) {
				let person: any = {}
				person.name = item.user_id.name + " " + item.user_id.last_name
				person.code = item?.personal_code
				person.id = item._id
				person.shift = item?.shift_info;
				person.collection = item?.collection_info;
				person.part = item?.part_info;
				person.rank = item?.rank_info;
				this.options.push(person)
			}
			this.filteredOptions = this.options.slice();
			this.progress = false;
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
		this.progress = true;
		this.work_days = 0;
		this.total_work = 0;
		this.holiday_work = 0;
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
			type:'detail'
		}).subscribe({
			next: async (data: any) => {
				if (data.monthInfo.length) {
				data = data.monthInfo[0];
					this.dataSource = data[0]
					this.work_days = data[1].work_days
					this.total_work = data[1].total_work
					this.holiday_work = data[1].holiday_work
					this.holidays = data[1].holidays
					this.absent_day = data[1].absent_day
					this.present_day = data[1].present_day
					this.total_day = data[1].total_day
					this.user_info = this.filteredOptions.filter((e: any) => {
						return e.id == this.user
					})[0]
				}
				this.progress = false;
				/*				if (!Object.keys(data).length) {
									this._snackBar.openFromComponent(SnackbarComponent, {
										data: `کاربر فاقد فعالیت در دوره ی انتخابی است`,
										duration: 3000
									})
								} else {
									await this.PCalendar.preparingDay(this.year, this.month, currentDate).then((ds: any) => {
										data = Object.values(data)[0];
										let device:any;
										let shift:any;
										setTimeout(() => {
											for (let row of ds[0]) {
												this.total_day++;
												row.conflict = false
												let traffics: any = Object.keys(data).filter(key => key == row.date)
												if (!shift && traffics[0]?.shift)
													shift = traffics[0].shift
												let i = 1;
												traffics.length ? traffics = data[traffics[0]] : traffics = [];
												if (traffics.find((e:any)=>{ return ['n','m','e'].includes(e?.status )})){
													 row.user_status = 'present'
													traffics.length && row.day_status != 'holiday' ? this.present_day++ : '';
													traffics.length && row.day_status == 'holiday' ? this.holiday_work++ : '';
												}
												else if (traffics.find((e:any)=>{ return ['ne'].includes(e?.status )})){
													row.day_status == 'normal' || shift?.allow_holiday == false ? this.absent_day++ : '';
													row.user_status = 'absent';
												}
												else {
													row.day_status == 'normal' || shift?.allow_holiday == false ? this.absent_day++ : '';
													row.user_status = 'absent';
												}
												
												for (let traffic of traffics) {
													if(!device)
														device = traffic?.device_ip?._id;
													row[`traffic${i}`] = {
														time:(traffic.acceptedTime ? this.date.dateInfo(traffic.acceptedTime).time:''),
														type: traffic?.acceptedType,
														id: traffic?._id,
														date:traffic.date?.date,
														status:traffic.status
													}
													traffic.duration ? row.time = traffic.duration : ''
													traffic.duration ? this.total_work += +traffic.duration : ''
													if (traffic.conflict == true) {
														row.conflict = true
													}
													i++;
												}
											}
											this.user_info = this.filteredOptions.filter((e: any) => {
												return e.id == this.user
											})
											this.user_info = this.user_info[0];
											this.user_info.device = device ?? '';
											this.holidays = ds[1].holidays;
											this.work_days = ds[1].work_days;
											this.dataSource = ds[0];
											console.log(this.dataSource)
										})
									})
								}
								this.progress = false;*/
			},
			error: (err: any) => {
			},
		})
	}
	
	async reset_data() {
		this.progress = true;
		let user = this.user_info.code;
		this.user_info = undefined;
		this.dataSource = []
		await this.httpAttendance.readFromDevice({
			watch: 'review',
			user: user
		})
			.subscribe({
				next: (data) => {
					this.submit()
					this.progress = false;
				},
				error: (err) => {
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: (err.error.error.message ?? `خطا در مرور اطلاعات`),
						duration: 3000
					})
					this.submit()
					this.progress = false;
				},
			})
	}
	
	openEditDialog(item: any, element:any) {
		if (!item?.id || !item){
			const dialogRef = this.dialog.open(ManualAttendanceComponent, {
				width:'500px',
				direction:"rtl",
				data: {date:element.date, user:this.user_info.code, device:this.user_info.device},
				hasBackdrop:true,
				disableClose:true
			})
			dialogRef.afterClosed().subscribe(async (result) => {
				if (result == 'success') {
					await this.submit();
				}
			});
		}
		else{
			
			let data: any = {};
			data = {
				subject:'edit',
				type: item.type,
				time: item.time,
				item:{
					id:item.id,
					date:item.date
				},
				from:'attendance'
			}
			const dialogRef = this.dialog.open(EditLogComponent, {
				data: data,
			})
			dialogRef.afterClosed().subscribe(async (result) => {
				if (result == 'success') {
					await this.submit();
				}
			});
		}
	}
	
}
