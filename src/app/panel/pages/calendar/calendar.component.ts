import { Component, OnInit } from '@angular/core';
import { DateService } from "../../../services/date.service";
import { MatDialog } from "@angular/material/dialog";
import { UsercreatedComponent } from "../../../shared/dialog/usercreated/usercreated.component";
import { MonthComponent } from "../../../shared/dialog/month/month.component";
import { YearComponent } from "../../../shared/dialog/year/year.component";
import { DayEventsComponent } from "../../../shared/dialog/day-events/day-events.component";
import { CalendarHttpService } from "../../../HttpServices/calendar-http.service";
import { async } from "rxjs";

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
	constructor(private date: DateService,
	            public dialog: MatDialog,
	            private http:CalendarHttpService
	            ) {
	}
	
	yearIfo: any = [];
	monthInfo: any;
	days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنچشنبه', 'جمعه'];
	months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "اَمرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
	weeks: any;
	thisYear:any;
	thisMonth:any;
	thisDay:any;
	thisDayInfo:any;
	currentDate:any;
	today = this.date.dateInfo(Date.now())
	 ngOnInit() {
		this.currentDate = this.date.dateInfo(Date.now());
		 this.preparingYear().then((data)=>{
			setTimeout(()=>{
				this.preparingMonth();
				this.preparingWeeks();
			})
		 });
	}
	
	async preparingYear(year?: string) {
		return new Promise((resolve, reject) => {
			this.yearIfo = [];
			let date;
			year ? date = `${year}` : date = (() => {
				let date: any = this.date.dateInfo(Date.now());
				date = `${date.year}`;
				return date
			})();
			this.thisYear = date;
			let yearLog = new Promise(async(resolve, reject) => {
				await this.http.getCalendar({year:this.thisYear}).subscribe((yearLog:any)=>{
					resolve(yearLog.calendars);
				});
			})
			yearLog.then((data:any)=>{
				for (let m = 1; m <= 12; m++) {
					let mInfo = this.date.dateInfo(this.date.timeToUnix(this.thisYear + `/${m}` + '/1'));
					let mds = mInfo.monthDays
					let ms: any = {
						title: mInfo.monthName,
						length: mInfo.monthDays,
						month:mInfo.month,
						days: [],
					}
					for (let d = 1; d <= mds; d++) {
						let dayInfo = this.date.dateInfo(this.date.timeToUnix(this.thisYear + `/${m}` + `/${d}`));
						let logInfo = data.filter((e:any)=> {return (e.day == d && e.month == m)})
						let info = {
							'title': dayInfo.dayOfWeek,
							'day': dayInfo.day,
							'is_holiday': (dayInfo.dayOfWeek == 'جمعه' || logInfo[0]?.is_holiday == true),
							'events': logInfo[0]?.events?? [],
							'date': dayInfo.date,
							'month': dayInfo.monthName
						}
						ms.days.push(info)
					}
					this.yearIfo.push(ms)
				}
				resolve(this.yearIfo);
			})
			
		})
	}
	
	preparingMonth(month?: any) {
		let monthInfo;
		if (!month)
			monthInfo = this.yearIfo[+(this.date.dateInfo(Date.now()).month)-1];
			
		else if (typeof month == "number" || (!isNaN(Number(month))))
			monthInfo = this.yearIfo[+(month) - 1];
		
		else if (typeof month == "string")
			monthInfo = this.yearIfo.filter((e: any) => {
				return e.title == month
			})[0]
		this.monthInfo = monthInfo
		this.thisMonth = monthInfo.month;
		this.thisDay = this.date.dateInfo(Date.now()).day;
	}
	
	preparingWeeks() {
		this.weeks = [];
		let week = ["-", "-", "-", "-", "-", "-", "-"];
		for (let day of this.monthInfo.days) {
			week[this.days.indexOf(day.title)] = day
			if (day.title == 'جمعه' || day.day == this.monthInfo.length) {
				this.weeks.push(week);
				week = ["-", "-", "-", "-", "-", "-", "-"];
			}
		}
	}
	
	reset(){
		this.preparingYear().then((data)=>{
			setTimeout(()=>{
				this.preparingMonth();
				this.preparingWeeks();
			})
		});
	}
	
	setYear(){
		const dialogRef = this.dialog.open(YearComponent, {
			width:'500px',
			disableClose:true,
			data:{year:this.thisYear}
		});
		dialogRef.afterClosed().subscribe(async (data:any)=>{
			this.preparingYear(data.year)
			this.setMonth(this.thisMonth)
		})
	}
	
	setMonth(month:number){
		const dialogRef = this.dialog.open(MonthComponent, {
			width:'500px',
			disableClose:true,
			data:{month:this.thisMonth}
		});
		dialogRef.afterClosed().subscribe(async (data:any)=>{
			this.preparingMonth(data.month+1);
			this.preparingWeeks();
		})
	}
	
	setEvents(day:number){
		let data = {
			year:this.thisYear,
			monthName : this.monthInfo.title,
			month : this.monthInfo.month,
			day:day,
			dayInfo:this.monthInfo.days[day-1],
		}
		const dialogRef = this.dialog.open(DayEventsComponent, {
			width:'500px',
			disableClose:true,
			data:data
		});
		dialogRef.afterClosed().subscribe(async (data:any)=>{
			if(data.change){
				this.preparingYear(this.thisYear).then((data)=>{
					setTimeout(()=>{
						this.preparingMonth(this.thisMonth);
						this.preparingWeeks();
					})
					}
				)
			}
		})
	}
}
