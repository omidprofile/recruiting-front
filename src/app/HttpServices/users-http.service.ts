import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs";
import { config } from "../../environments/config";

@Injectable({
    providedIn: 'root'
})
export class UsersHttpService {

    constructor(private http: HttpClient) {
    }

    test(data: any) {
        return this.http.post(`${config.apiRoute}/attendance/test`, data, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    getUsers() {
        return this.http.get(`${config.apiRoute}/users`)
            .pipe(
                shareReplay(),
            );
    }
    
    getLogs(body:any) {
        return this.http.post(`${config.apiRoute}/attendance/getLogs`,body,{})
            .pipe(
                shareReplay(),
            );
    }
    
    createUser( body:any){
        return this.http.post(`${config.apiRoute}/users/create`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }
}
