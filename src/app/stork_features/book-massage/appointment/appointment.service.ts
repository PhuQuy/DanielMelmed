import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class AppointmentService {
    constructor(private http: Http, private authService: AuthService) {
    }
   
}