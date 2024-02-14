import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { config } from "../../environments/config";
import { shareReplay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncDecHttpService {
  
  constructor(private http: HttpClient) { }
  
  get(params?:any){
    return this.http.get(`${config.apiRoute}/inc-dec`,{
      params:params
    })
        .pipe(
            shareReplay(),
        )
  }
  
  create(data:any){
    return this.http.post(`${config.apiRoute}/inc-dec`,data)
        .pipe(
            shareReplay(),
        )
  }
  
  update(data:any, id:string){
    return this.http.post(`${config.apiRoute}/inc-dec/update/${id}`,data,{})
        .pipe(
            shareReplay(),
        )
  }
}
