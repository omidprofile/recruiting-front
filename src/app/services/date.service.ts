import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  
  toEnDigit(s:any) {
    return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,    // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
        function(a:any) {
          return a.charCodeAt(0) & 0xf;
        }     // Remove the Unicode base(2) range that not match
    );
  }
  
  convertLocalToNum(val:any){
    return +this.toEnDigit(val.toString()).replace(/[a-zA-Z,]/g,'');
  }
  
  dateInfo(unixTime:any) {
    let days = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنچشنبه", "جمعه", "شنبه"];
    let months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "اَمرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    let monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    let date = new Date(unixTime);
    let fullDate = this.toEnDigit(date.toLocaleDateString("fa-IR"));
    let full = fullDate.split("/");
    let time = this.toEnDigit(date.toLocaleTimeString("fa-IR"));
    let year = this.toEnDigit(full[0])
    let month = this.toEnDigit(full[1]);
    let day = this.toEnDigit(full[2]);
    let dayOfWeek = days[date.getDay()];
    let monthName = months[+month-1];
    let monthDay=monthDays[+month-1]
    
    return {
      time: time,
      date: fullDate,
      year: +year,
      month: +month,
      monthName: monthName,
      monthDays:monthDay,
      day: +day,
      dayOfWeek: dayOfWeek,
      text: ''
    };
  }
  
  timeToUnix(date: string) {
    moment().format("jYYYY/jM/jD");
    let result = moment(date, "jYYYY/jM/jD HH:mm:ss").format("YYYY-M-D HH:mm:ss");
    return +new Date(result);
  }
}
