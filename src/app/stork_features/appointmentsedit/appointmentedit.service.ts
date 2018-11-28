import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from '.././shared/auth.service';

@Injectable()
export class AppointmentseditService {
    constructor(private http: Http, private authService: AuthService) {
    }

    get_appoinment_by_Id(apoointmentId: any) {
            let apilink = env.environment.serviceuri + "/appoinment/"+apoointmentId;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }


    get_all_appointment_status() {
        let apilink = env.environment.serviceuri + "/appointment_status";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    get_all_customer_from_bookmassage() {
        let apilink = env.environment.serviceuri + "/customer/book-massage";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    get_all_available_therapists(condition: any) {
        //debugger;
        let apilink = env.environment.serviceuri + "/therapist_availabilitie/availabletherapist";
        return this.http.post(apilink,
            {
                start_date_time: condition.startdate,
                end_date_time: condition.enddate,
                served_regions: condition.servedregion
            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    get_all_available_services(condition: any) {
        // //debugger;
        // let apilink = env.environment.serviceuri + "/service";
        // return this.http.post(apilink,
        //     {
        //         regionId: condition.regionId,
        //         subregionId: condition.subregionId
        //     },
        //     { headers: this.authService.headers }).map(res => res.json());
        let apilink = env.environment.serviceuri + "/service";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }


    get_all_service_addon() {
        let apilink = env.environment.serviceuri + "/service_addon";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all_therapist() {
        let apilink = env.environment.serviceuri + "/therapist";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

    }
    create_appoinment(Customer: any,service,appointmentStatus,therapistArr,therapistsData,serviceAddOnData,conditionArr,appointmentform,notes) {
        //debugger;
        var appsts = appointmentStatus.name;
        if(!appsts)
        {
        appointmentStatus={name:"Active",icon:"fa-check",
        font_color:"2F2F2F",color:"5610AD"};
        }
        let apilink = env.environment.serviceuri + "/appoinment";
        return this.http.post(apilink,
            {
                customer:Customer,
                appointment_statuses: appointmentStatus,
                start_date_Time: conditionArr.startdate,
                end_date_Time: conditionArr.enddate,
                    therapist: therapistArr,
                    service: service,
                    service_addons: serviceAddOnData,
                    manual_enteries:appointmentform.ManualItem,
                    therapist_availability:therapistArr,
                    tip: '',
                    total_cost: '',
                    grand_total_cost: '',
                    notes: notes,
                    work_order_notes: appointmentform.worknotes,
                    privacy_notes: appointmentform.privatenotes,
                    invoice_notes: appointmentform.invoicenotes,
                    summary: appointmentform.summarynotes,
                    user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());
    }
}