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

    getUsers(params?:any) {
        return this.http.get(`${config.apiRoute}/users`,{
            params:params
        })
            .pipe(
                shareReplay(),
            );
    }

    getJob(param?:any) {
        return this.http.get(`${config.apiRoute}/users/job`,{
            params:param
        })
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

    updateUser( body:any){
        return this.http.post(`${config.apiRoute}/users/update`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateMobile( body:any){
        return this.http.post(`${config.apiRoute}/users/mobile`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updatePhone( body:any){
        return this.http.post(`${config.apiRoute}/users/phone`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateEmail( body:any){
        return this.http.post(`${config.apiRoute}/users/email`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateAddress( body:any){
        return this.http.post(`${config.apiRoute}/users/address`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateExperiment( body:any){
        return this.http.post(`${config.apiRoute}/users/experiment`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateGuarantee( body:any){
        return this.http.post(`${config.apiRoute}/users/guarantee`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    rmGuaranteeImg( body:any){
        return this.http.post(`${config.apiRoute}/users/rmGuaranteeImg`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    rmExperimentImg( body:any){
        return this.http.post(`${config.apiRoute}/users/rmExperimentImg`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    addExperimentImg( body:any){
        return this.http.post(`${config.apiRoute}/users/addExperimentImg`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }
    addGuaranteeImg( body:any){
        return this.http.post(`${config.apiRoute}/users/addGuaranteeImg`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateJob(body:any){
        return this.http.post(`${config.apiRoute}/users/updateJob`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateEmployee(body:any){
        return this.http.post(`${config.apiRoute}/users/updateEmployee`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    updateAvatar(body:any){
        return this.http.post(`${config.apiRoute}/users/updateAvatar`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    validateUser( body:any,param:string){
        return this.http.post(`${config.apiRoute}/users/validate/${param}`, body, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }
    
    getWorkReport(params?:any){
       return this.http.get(`${config.apiRoute}/workReport`,{
            params:params
        }).pipe(
            shareReplay()
        )
    }

    calculate(body?:any){
       return this.http.post(`${config.apiRoute}/workReport/calculate`, body
        ).pipe(
            shareReplay()
        )
    }
    
    saveWorkReports(report:any){
       return this.http.post(`${config.apiRoute}/workReport`,report)
            .pipe(
                shareReplay(),
            );
    }

    toBank(report:any){
       return this.http.post(`${config.apiRoute}/workReport/toBank`,report)
            .pipe(
                shareReplay(),
            );
    }
}
