import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';

@Injectable()
export class AuthService {
    user = null;
    headers: Headers;
    constructor(private http: Http) {
        let header = new Headers();
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.user = user;
        const token = user && user.token;
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + token);
        this.headers = header;
    }

    
}
