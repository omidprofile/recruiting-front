import { Injectable } from '@angular/core';
import { config } from "../../environments/config";
import { shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportMakerService {

  constructor(private http: HttpClient) { }
  
  get(){
    return this.http.get(`${config.apiRoute}/report-maker`)
        .pipe(
            shareReplay(),
        )
  }
  
  create(report:any){
    return this.http.post(`${config.apiRoute}/report-maker`,report)
        .pipe(
            shareReplay(),
        )
  }
  
  update(report:any, id:string){
    return this.http.post(`${config.apiRoute}/report-maker/${id}`,report,{})
        .pipe(
            shareReplay(),
        )
  }
}
