import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UsersHttpService } from "../../../../HttpServices/users-http.service";
import { MatDialog } from "@angular/material/dialog";
import { ConflictDialogComponent } from "../../../../shared/dialog/conflict-dialog/conflict-dialog.component";
import { tap } from "rxjs";
import { RolesHttpService } from "../../../../HttpServices/roles-http.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ReportsService } from "../../../../services/reports.service";
import { Router } from "@angular/router";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DateService } from "../../../../services/date.service";
import _default from "chart.js/dist/plugins/plugin.filler";
import beforeDatasetDraw = _default.beforeDatasetDraw;
import { CalendarHttpService } from "../../../../HttpServices/calendar-http.service";
import { CalendarService } from "../../../../services/calendar.service";

@Component({
	selector: 'app-work-report',
	templateUrl: './work-report.component.html',
	styleUrls: ['./work-report.component.scss']
})
export class WorkReportComponent implements OnInit {
	@ViewChild('input') input: ElementRef<HTMLInputElement>;
	
	options: any;
	companies:any;
	collections:any;
	parts:any;
	ranks:any;
	report_data:any;
	report_base:any;
	report_type:any;
	
	company_selected:any;
	collection_selected:any;
	part_selected:any;
	rank_selected:any;
	
	filteredOptions: any[];
	
	monthLogs:any;
	
	displayedColumns: string[] = [
	];
	dataSource :any;
	report = false;
	info = false;
	moreInfo = false;
	loading = false;
	constructor(
		private http: UsersHttpService,
		private roleHttp: RolesHttpService,
		public dialog: MatDialog,
		public Report:ReportsService,
		private route:Router,
		private _snackBar: MatSnackBar,
		private date:DateService,
		private calendar:CalendarHttpService,
		private PCalendar:CalendarService
		) {
	}
	
	ngOnInit() {
		if(this.Report.report().title) {
			this.report_data = this.Report.report();
			this.displayedColumns = this.report_data.cols
		}else {
			this.route.navigate(['panel/report/reports']).then(()=>{
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `ابتدا نوع گزارش را انتخاب نمایید`,
						duration: 1500
					})
				})
		}
		let today = this.date.dateInfo(Date.now())
		this.year = today.year;
		this.month = today.month
		this.day = today.day
		this.getUsers()
	}
	
	getUsers() {
		this.http.getUsers().subscribe((data: any) => {
			this.options = []
			
			for (let item of data) {
				let person: any = {}
				person.name = item.name + " " + item.last_name
				person.code = item.jobs_id[0].personal_code
				person.id = item._id
				this.options.push(person)
			}
			this.filteredOptions = this.options.slice();
		})
	}
	
	filter(): void {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredOptions = this.options.filter((o: any) => o.name.toLowerCase().includes(filterValue));
	}
	
	day: any;
	month: any;
	year: any;
	user: any;
	
	viewReport() {
		this.monthLogs = [];
		this.report = true;
		this.moreInfo = false;
		this.info = false;
		let body: any = {};
		body.type = 'report';
		// body.day = this.day;
		body.month = this.month;
		body.year = this.year;
		body.user = this.user;
		this.loading = true;
		let mLog = new Promise((resolve, reject) => {
			this.calendar.getCalendar({
				year:this.year,
				month:this.month
			}).subscribe(data=> resolve(data));
		})
		mLog.then((data:any)=>{
			this.monthLogs = data.calendars;
			this.http.getLogs(body)
				.subscribe({
					next: (data: any) => {
						this.loading = false
						this.dataSource = []
						let temp :any= [];
						data = data.data;
						let item: any = {}
						let today = this.date.dateInfo(Date.now())
						let currentDate:any='';
						currentDate += (this.year ? `${this.year}/` : `${today.year}/`);
						currentDate += (this.month ? `${this.month}/` : `${today.month}/`);
						currentDate += '1'
						this.PCalendar.preparingDay(this.year, this.month, currentDate).then((dc:any)=>{
							for (let user in data) {
								let month = data[user]
								item = {}
								item.course_name = currentDate.slice(0,-2)
								item.total_time = 0
								item.total_normal = 0
								item.total_work = 0
								item.holidays = 0
								item.total_day = Object.keys(month).length
								item.conflict = false;
								item.conflict_arr = []
								for (let day in month) {
									let logs = month[day]
									if (logs[0]?.shift && !logs[0]?.is_holiday ){
										if (this.monthLogs.filter((e:any)=>{return e.day == logs[0].date.day}).length == 0)
											item.total_time += logs[0].shift.force_time;
									}
									
									
									if(logs[0]?.is_holiday || this.monthLogs.filter((e:any)=>{
										return 	e.day == logs[0].date.day
									}).length)
										item.holidays++
									
									
									for (let log of logs) {
										if (item.name == undefined && log.user){
											item.name = log.user.name
											item.last_name = log.user.last_name
											item.user_id = log.user._id
										}
										
										if (item.personal_code == undefined)
											item.personal_code = log.personal_code
										
										if (log?.duration)
											item.total_work += +log.duration
										
										if (log?.conflict == true){
											item.conflict = true
											item.conflict_arr.push(logs)
										}
									}
								}
								item.total_normal = item.total_work >= item.total_time ?item.total_time:item.total_work
								item.total_extra = item.total_work-item.total_time > 0?item.total_work-item.total_time:0
								item.total_delay = item.total_time -item.total_work>0 ?item.total_time -item.total_work: 0
								item.holiday_work = item.holidays
								item.holidays = dc[1].holidays;
								item.all_day = dc[1].days;
								item.absent_days = item.all_day - (item.total_day + item.holidays - item.holiday_work );
								temp.push(item)
							}
							this.dataSource = temp;
						})
					},
					error: (e) => {
						console.log(e)
					}
				})
		})
	}
	
	viewInfo() {
		this.report = false;
		this.moreInfo = false;
		this.info = true;
	}
	
	viewMoreInfo() {
		this.report = false;
		this.moreInfo = true;
		this.info = false;
	}
	
	createHour(hour:any){
		let result = Math.floor(hour)+":"
		let min = hour - Math.floor(hour);
		min = min*60;
		result = result + (min ==0?"00:":Math.floor(min)+":")
		let sec = min - Math.floor(min)
		sec = sec*60;
		result = result+ (sec == 0?"00":Math.floor(sec))
		return result
	}
	
	conflict(element:any){
		
		const dialogRef = this.dialog.open(ConflictDialogComponent, {
			data: element,
		})
		dialogRef.afterClosed().subscribe(result => {
			console.log('done')
		});
	}
	
	setUser(id:any){
		this.user = id
	}
	
	async getCompanies(){
		await this.roleHttp.getCompanies().subscribe((data:any) => {
			this.companies = data.companies
		})
	}
	
	async getCollections(){
		this.roleHttp.getCollection(this.company_selected).subscribe({
			next: (data: any) => {
				this.collections = data.collections
			},
			error: (error) => {
				console.log(error)
			}
		})
	}
	
	getParts(){
		this.roleHttp.getPart(this.collection_selected).subscribe({
			next: (data: any) => {
				this.parts = data.parts
			},
			error: (error) => {
				console.log(error)
			}
		})
	}
	
	getRanks(){
		this.roleHttp.getRank(this.part_selected).subscribe({
			next: (data: any) => {
				this.ranks = data.ranks
			},
			error: (error) => {
				console.log(error)
			}
		})
	}
	
	saveLog(row:any){
		console.log(row)
		if (!this.year || !this.month){
			this._snackBar.openFromComponent(SnackbarComponent, {
				data: `سال و ماه بایستی وارد شوند`,
				duration: 1500
			})
			return
		}
		else {
			let title = '';
			title += `${this.year}/` ?? ''
			title +=`${this.month}` ?? ''
			// title += `${this.day}` ?? ''
			let body:any = {}
			body.title = title;
			body.type = this.Report.report().type;
			body.info = row;
			body.creator='';
			body.personal_code=row.personal_code;
			this.http.saveWorkReports(body).subscribe({
				next:(data)=>{
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `با موفقیت ذخیره شد`,
						duration: 1500
					})
				},
				error:(err)=>{
					this._snackBar.openFromComponent(SnackbarComponent, {
						data: `خطا در ذخیره اطلاعات`,
						duration: 1500
					})
					console.log(err)
				},
			})
		}

	}

	protected readonly Object = Object;
}
