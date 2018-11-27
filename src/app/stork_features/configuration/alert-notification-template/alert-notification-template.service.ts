import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';


@Injectable()
export class AlertNotificationTemplateService {

    constructor(private http: Http, private authService: AuthService) {
    }

    get_all() {
        let apilink = env.environment.serviceuri + "/email_sms_template";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

    }

    create_template(smsBody, emailBody, subject, userType,notifType) {
        let apilink = env.environment.serviceuri + "/email_sms_template";
        return this.http.post(apilink,
            {
                smsBody: smsBody,
                emailBody: emailBody,
                type: userType,
                subject: subject,
                notifType:notifType,
                user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());

    }

    update_template_for_sms(id, smsBody,subject,type,notifType,emailBody,appBody) {
        let apilink = env.environment.serviceuri + "/email_sms_template";
        return this.http.put(apilink,
            {
                _id: id,
                smsBody: smsBody,
                emailBody: emailBody,
                type: type,
                subject: subject,
                notifType:notifType,

            },
            { headers: this.authService.headers }).map(res => res.json());

    }
update_template_for_email(id, smsBody,subject,type,notifType,emailBody,appBody) {
        let apilink = env.environment.serviceuri + "/email_sms_template";
        return this.http.put(apilink,
            {
                _id: id,
                smsBody: smsBody,
                emailBody: emailBody,
                type: type,
                subject: subject,
                notifType:notifType,

            },
            { headers: this.authService.headers }).map(res => res.json());

    }
    delete_template_by_Id(id){
         let apilink = env.environment.serviceuri + "/email_sms_template/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
}
