import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs";
import { config } from "../../environments/config";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  
  constructor(private http: HttpClient) {
  }
  
    readFromDevice(body:any){
    return this.http.post(`${config.apiRoute}/attendance/readDevice`, body)
  }
  
  getAttendances(body:any){
    return this.http.post(`${config.apiRoute}/attendance/monthInfo`,body)
  }
  
  getDaily(body:any){
    return this.http.post(`${config.apiRoute}/attendance/getLogs`,body)
  }
  
  createAttendances(body:any){
    return this.http.post(`${config.apiRoute}/attendance/insertLog`,body)
        .pipe(
            shareReplay(),
        )
  }
  
  updateAttendances(body:any, id:string, type:string){
    return this.http.post(`${config.apiRoute}/attendance/update/${id}`,body,{
      params:{type:type}
    })
        .pipe(
            shareReplay(),
        )
  }
  
  getDevices(params?:any){
    return this.http.get(`${config.apiRoute}/attendance/devices`,{
      params:params
    })
        .pipe(
            shareReplay(),
        )
  }
  
  updateDevice(body:any, id:string){
    return this.http.post(`${config.apiRoute}/attendance/device/${id}`,body,{
    })
        .pipe(
            shareReplay(),
        )
  }
  createDevice(body:any){
    return this.http.post(`${config.apiRoute}/attendance/device`,body,{
    })
        .pipe(
            shareReplay(),
        )
  }
}
