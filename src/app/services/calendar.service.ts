import { Injectable } from '@angular/core';
import { DateService } from "./date.service";
import { UsersHttpService } from "../HttpServices/users-http.service";
import { CalendarHttpService } from "../HttpServices/calendar-http.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private date: DateService,
              private http: UsersHttpService,
  private calendar: CalendarHttpService) { }
  
  async preparingDay(year:number,month:number,date?: string) {
    let days: any;
    let dateInfo: any;
    let zone: any;
    let holidays = 0;
    let work_days = 0;
    if (date) {
      zone = this.date.timeToUnix(date)
    } else {
      let temp = this.date.dateInfo(Date.now());
      let fd = temp.date.split('/');
      fd[2] = 1;
      fd = fd.join('/');
      zone = this.date.timeToUnix(fd)
    }
    let today = this.date.dateInfo(Date.now())
    if (today.month > this.date.dateInfo(zone).month) {
      days = this.date.dateInfo(zone).monthDays
    } else if (today.month < this.date.dateInfo(zone).month) {
      days = 0
    } else {
      days = today.day
    }
    return new Promise(async (resolve, reject) => {
      await this.calendar.getCalendar({
        year: year,
        month:month
      }).subscribe((data: any) => {
        let temp = [];
        for (let i = 0; i < days; i++) {
          dateInfo = this.date.dateInfo(zone);
          zone = new Date(zone);
          zone.setDate(zone.getDate() + 1)
          let row: any = {};
          row.day = dateInfo.dayOfWeek;
          row.dayNumber = dateInfo.day;
          row.date = dateInfo.date;
          row.day == 'جمعه' || data.calendars.filter((e: any) => {
            return (e.day == row.dayNumber && e.is_holiday)
          }).length ? row.day_status = 'holiday' : row.day_status = 'normal';
          row.day == 'جمعه' || data.calendars.filter((e: any) => {
            return (e.day == row.dayNumber && e.is_holiday)
          }).length ? holidays++ : work_days++;
          temp.push(row);
        }
        resolve([temp,{holidays:holidays, work_days:work_days, days:days}]);
      });
    })
  }
  
}
