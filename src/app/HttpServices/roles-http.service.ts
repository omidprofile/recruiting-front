import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs";
import { config } from "../../environments/config";

@Injectable({
  providedIn: 'root'
})
export class RolesHttpService {
  
  constructor(private http: HttpClient) {
  }
  
    getCompanies(){

     return this.http.get(`${config.apiRoute}/company`)
        .pipe(
            shareReplay(),
        )
  }
  createCompany(company:any){
      return this.http.post(`${config.apiRoute}/company`,company)
          .pipe(
              shareReplay(),
          )
  }
  updateCompany(company:any, id:string){
      return this.http.post(`${config.apiRoute}/company/${id}`,company,{})
          .pipe(
              shareReplay(),
          )
  }

 
    getCollection(company:any){
        return this.http.get(`${config.apiRoute}/collection`,{
            params:{
                company:company
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    createCollection(collection:any){
        return this.http.post(`${config.apiRoute}/collection`,collection)
            .pipe(
                shareReplay(),
            )
    }
    updateCollection(collection:any, id:string){
        return this.http.post(`${config.apiRoute}/collection/${id}`,collection,{})
            .pipe(
                shareReplay(),
            )
    }

    
    getPart(collection:any){
        return this.http.get(`${config.apiRoute}/part`,{
            params:{
                collection:collection
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    createPart(part:any){
        return this.http.post(`${config.apiRoute}/part`,part)
            .pipe(
                shareReplay(),
            )
    }
    updatePart(part:any, id:string){
        return this.http.post(`${config.apiRoute}/part/${id}`,part,{})
            .pipe(
                shareReplay(),
            )
    }

    
    
    getRank(part:any){
        return this.http.get(`${config.apiRoute}/rank`,{
            params:{
                part:part
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    createRank(rank:any){
        return this.http.post(`${config.apiRoute}/rank`,rank)
            .pipe(
                shareReplay(),
            )
    }
    updateRank(rank:any, id:string){
        return this.http.post(`${config.apiRoute}/rank/${id}`,rank,{})
            .pipe(
                shareReplay(),
            )
    }
    
    getShift(part:any){
        return this.http.get(`${config.apiRoute}/shift`,{
            params:{
                part:part
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    
    
    createShift(shift:any){
        return this.http.post(`${config.apiRoute}/shift`,shift)
            .pipe(
                shareReplay(),
            )
    }
    
    
    

    getBaseSalary(part:any){
        return this.http.get(`${config.apiRoute}/base-salary`,{
            params:{
                part:part
            }
        })
            .pipe(
                shareReplay(),
            );
    }
    
    createBaseSalary(baseSalary:any){
        return this.http.post(`${config.apiRoute}/base-salary`,baseSalary)
            .pipe(
                shareReplay(),
            )
    }
    

    
    
}
