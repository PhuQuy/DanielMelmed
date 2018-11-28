import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class TherapistAvailabilityService {

    constructor(private http: Http, private authService: AuthService) {
    }

    get_all_Availability() {
        let apilink = env.environment.serviceuri + "/therapist_availabilitie";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    
    get_all_available_therapist(start_date: Date) {
        let apilink = env.environment.serviceuri + "/therapist_availabilitie/allavailabletherapist";
        return this.http.post(apilink,
            {
                start_date: start_date,
            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    saveAvailability(availability: any) {
        let apilink = env.environment.serviceuri + "/therapist_availabilitie";
        return this.http.post(apilink,
            {
                therapistId: this.authService.user._id,
                start_date_time: availability.start_date,
                end_date_time: availability.end_date,
                availability: availability.availability,
                notes: availability.notes
            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    updateAvailability(availability: any) {
        let apilink = env.environment.serviceuri + "/therapist_availabilitie";
        return this.http.put(apilink,
            {
                _id: availability.id,
                therapistId: this.authService.user._id,
                start_date_time: availability.start_date,
                end_date_time: availability.end_date,
                availability: availability.availability,
                notes: availability.notes,
                isdeleted: false
            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    removeAvailability(availability: any) {
        //debugger;
        let availabilityId = availability.id;
        let apilink = env.environment.serviceuri + "/therapist_availabilitie/" + availabilityId;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

}