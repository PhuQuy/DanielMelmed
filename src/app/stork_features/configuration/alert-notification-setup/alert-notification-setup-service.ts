import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';


@Injectable()
export class AlertNotificationSetupService {

    constructor(private http: Http, private authService: AuthService) {
    }

    get_all() {
        let apilink = env.environment.serviceuri + "/notification_frequency";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

    }

    create_notification_frequency(alertNotificationform: any) {
        let apilink = env.environment.serviceuri + "/notification_frequency";
        return this.http.post(apilink,
            {
                label: alertNotificationform.addnewlabel,
                value: alertNotificationform.valuesec,
                isactive: alertNotificationform.status

            },
            { headers: this.authService.headers }).map(res => res.json());

    }

    update_notification_frequency(id, alertNotificationform: any) {
        let apilink = env.environment.serviceuri + "/notification_frequency";
        return this.http.put(apilink,
            {
                _id: id,
                label: alertNotificationform.addnewlabel,
                value: alertNotificationform.valuesec,
                isactive: alertNotificationform.status,

             
            },
            { headers: this.authService.headers }).map(res => res.json());

    }
delete_notification_frequency_by_Id(id){
     let apilink = env.environment.serviceuri + "/notification_frequency/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
}
}
