import { Injectable } from '@angular/core';
import { config } from "../../environments/config";
import { shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalendarHttpService {

  constructor(private http: HttpClient) { }
  
  getCalendar(params:any){
    return this.http.get(`${config.apiRoute}/calendar`, {
      params:params
    })
        .pipe(
            shareReplay(),
        )
  }
  setHoliday(body:any){
    return this.http.post(`${config.apiRoute}/calendar/holiday`, body)
        .pipe(
            shareReplay(),
        )
  }
  setEvent(body:any){
    return this.http.post(`${config.apiRoute}/calendar/event`, body)
        .pipe(
            shareReplay(),
        )
  }
}
