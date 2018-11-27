import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';

@Injectable()
export class IconAppointmentService {
    constructor(private http: Http, private authService: AuthService) {
    }
    create_appointment_status(iconappform) {
        let apilink = env.environment.serviceuri + "/appointment_status";
        return this.http.post(apilink,
            {
                icon: { class_name: iconappform.iconclass, color: iconappform.iconcolor },
                name: iconappform.statusname,
                fontcolor: iconappform.fontcolor,
                user: this.authService.user,
                backgroundcolor:iconappform.backgroundcolor
            },
            { headers: this.authService.headers }).map(res => res.json());
    }
    get_all() {
        let apilink = env.environment.serviceuri + "/appointment_status";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    update_appointment_status(id: string, iconappform) {
        let apilink = env.environment.serviceuri + "/appointment_status";
        return this.http.put(apilink,
            {
                _id: id,
                icon: { class_name: iconappform.iconclass, color: iconappform.iconcolor },
                name: iconappform.statusname,
                fontcolor: iconappform.fontcolor,
                backgroundcolor:iconappform.backgroundcolor,
                user: this.authService.user, is_deleted: false, is_active: true
            },
            { headers: this.authService.headers }).map(res => res.json());
    }
    delete_appointment_status_by_Id(id: string) {
        let apilink = env.environment.serviceuri + "/appointment_status/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
}