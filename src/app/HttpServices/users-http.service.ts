import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersHttpService {

    constructor(private http: HttpClient) {
    }

    test(data: any) {
        return this.http.post('http://localhost:2020/attendance/test', data, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe(
                shareReplay(),
            );
    }

    getUsers() {
        return this.http.get('http://localhost:2020/users')
            .pipe(
                shareReplay(),
            );
    }
}
