import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';

@Injectable()
export class LoginService {
    constructor(private http: Http) {

    }
    userLogin(email: string, password: string) {
        let data = new URLSearchParams();
        data.append('email', email);
        data.append('password', password);
        let apilink = env.environment.serviceuri + "/user/login";
        return this.http.post(apilink, data).map(res => res.json());
    }
}