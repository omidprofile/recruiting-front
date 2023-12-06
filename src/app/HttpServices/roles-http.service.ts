import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesHttpService {
  
  constructor(private http: HttpClient) {
  }
  
    getCompanies(){

     return this.http.get('http://localhost:2020/company')
        .pipe(
            shareReplay(),
        )
  }
  createCompany(company:any){
      return this.http.post('http://localhost:2020/company',company)
          .pipe(
              shareReplay(),
          )
  }
 
    getCollection(company:any){
        return this.http.get('http://localhost:2020/collection',{
            params:{
                company:company
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    
    getPart(collection:any){
        return this.http.get('http://localhost:2020/part',{
            params:{
                collection:collection
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    
    
    getRank(part:any){
        return this.http.get('http://localhost:2020/rank',{
            params:{
                part:part
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    
    
}
