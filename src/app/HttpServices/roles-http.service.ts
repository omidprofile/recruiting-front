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
  updateCompany(company:any, id:string){
      return this.http.post(`http://localhost:2020/company/${id}`,company,{})
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
    createCollection(collection:any){
        return this.http.post('http://localhost:2020/collection',collection)
            .pipe(
                shareReplay(),
            )
    }
    updateCollection(collection:any, id:string){
        return this.http.post(`http://localhost:2020/collection/${id}`,collection,{})
            .pipe(
                shareReplay(),
            )
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
    createPart(part:any){
        return this.http.post('http://localhost:2020/part',part)
            .pipe(
                shareReplay(),
            )
    }
    updatePart(part:any, id:string){
        return this.http.post(`http://localhost:2020/part/${id}`,part,{})
            .pipe(
                shareReplay(),
            )
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
    createRank(rank:any){
        return this.http.post('http://localhost:2020/rank',rank)
            .pipe(
                shareReplay(),
            )
    }
    updateRank(rank:any, id:string){
        console.log(id)
        return this.http.post(`http://localhost:2020/rank/${id}`,rank,{})
            .pipe(
                shareReplay(),
            )
    }

    
    
}
