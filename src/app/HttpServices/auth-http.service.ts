import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs";
import { config } from "../../environments/config";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }
  
  login(body:any){
    return this.http.post(`${config.apiRoute}/auth`, body)
        .pipe(
            shareReplay(),
        )
  }
  sendSms(body:any){
    return this.http.post(`${config.apiRoute}/auth/sendSms`, body,{
        headers: {'Access-Control-Allow-Origin': '*'}})
        .pipe(
            shareReplay(),
        )
  }
  
}
