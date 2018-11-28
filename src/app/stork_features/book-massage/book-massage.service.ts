import { Injectable, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { BaseService } from '@app/core/services/base.service';
import * as env from 'environments/environment';
import 'rxjs/add/operator/map';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { appointment_statuses, customer, customer_address, phone, Region, service, service_addons, Subregion, therapist, therapist_address } from './model/appointment.model';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class BookMassageService extends BaseService {
    // public currentAppointment: any;
    public notification: any;

    private userIdSource = new BehaviorSubject<any>(0);
    currentAppointment = this.userIdSource.asObservable();

    @Input('appointment')
    setAppointment(appointment: any) {
        //this.appointment = appointment;
        this.userIdSource.next(appointment)
    }

    // getAppointment(): any {
    //     return this.appointment;
    // }

    @Input('notification')
    setAlertNotification(notification: any) {
        this.notification = notification;
    }

    getAlertNotification(): any {
        return this.notification;
    }

    get_appoinment_by_Id(apoointmentId: any) {
        let apilink = env.environment.serviceuri + "/appoinment/" + apoointmentId;
        return this.http.get<any>(apilink).map(res => res);
    }

    get_all_appointment_status(): Observable<appointment_statuses[]> {
        let apilink = env.environment.serviceuri + "/appointment_status";
        // return this.http.get<any>(apilink).map(res => res);
        return this.http.get<any>(apilink)
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new appointment_statuses(
                        item._id,
                        item.name,
                        item.icon.class_name,
                        item.icon.color,
                        item.fontcolor
                    );
                });
            });

        // return this.http.get<any>(apilink)
        //     .map(res => {
        //         return res.ResponseMessage.map((statuses: appointment_statuses) => new appointment_statuses().deserialize(statuses))
        //     });
    }

    get_all_customer_from_bookmassage(): Observable<customer[]> {
        let apilink = env.environment.serviceuri + "/customer/book-massage";
        // return this.http.get<any>(apilink).map(res => res);
        return this.http.get<any>(apilink)
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new customer(
                        item._id,
                        item.firstname,
                        item.lastname,
                        item.imagename,
                        item.gender,
                        item.email,
                        item.emailpreferenceforcommunication,
                        item.phonepreferenceforcommunication,
                        item.messagepreferenceforcommunication,
                        item.rating,
                        item.customer_notes,
                        item.admin_notes,
                        item.details,
                        item.address.map(item1 => {
                            return new customer_address(
                                new Region(
                                    (item1.region != undefined) ? item1.region._id : "",
                                    (item1.region != undefined) ? item1.region.name : "",
                                ),
                                new Subregion(
                                    (item1.subregion != undefined) ? item1.subregion._id : "",
                                    (item1.subregion != undefined) ? item1.subregion.name : "",
                                ),
                                item1.address_name,
                                item1.address_type,
                                item1.street1,
                                item1.street2,
                                item1.city,
                                item1.state,
                                item1.country,
                                item1.zipcode,
                                item1.address_note
                            )
                        }),
                        item.contacts,
                        item.payment_mode
                    );
                });
            });
    }

    get_all_therapist() {
        let apilink = env.environment.serviceuri + "/therapist";
        // return this.http.get<any>(apilink).map(res => res);
        return this.http.get<any>(apilink)
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new therapist(
                        item._id,
                        item.name,
                        item.firstname,
                        item.lastname,
                        item.gender,
                        item.phone.map(item1 => {
                            return new phone(
                                item1.default,
                                item1.phone
                            )
                        }),
                        item.email,
                        new therapist_address(
                            new Region((item.address.region != undefined) ? item.address.region._id : "",
                                (item.address.region != undefined) ? item.address.region.name : ""),
                            new Subregion(
                                (item.address.subregion != undefined) ? item.address.subregion._id : "",
                                (item.address.subregion != undefined) ? item.address.subregion.name : ""
                            ),
                            item.address.street,
                            item.address.city,
                            item.address.state,
                            item.address.country,
                            item.address.zipcode
                        ),
                        item.appoinment_preference,
                        item.notification_enabled,
                        item.therapist_notes
                    );
                });
            });

    }

    get_all_available_therapists(condition: any): Observable<therapist[]> {
        //debugger;
        let apilink = env.environment.serviceuri + "/therapist_availabilitie/availabletherapist";

        return this.http.post<any>(apilink, {
            start_date_time: condition.startdate,
            end_date_time: condition.enddate,
            served_regions: condition.servedregion
        })
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new therapist(
                        item._id,
                        item.name,
                        item.firstname,
                        item.lastname,
                        item.gender,
                        item.phone.map(item1 => {
                            return new phone(
                                item1.default,
                                item1.phone
                            )
                        }),
                        item.email,
                        new therapist_address(
                            new Region((item.address.region != undefined) ? item.address.region._id : "",
                                (item.address.region != undefined) ? item.address.region.name : ""),
                            new Subregion(
                                (item.address.subregion != undefined) ? item.address.subregion._id : "",
                                (item.address.subregion != undefined) ? item.address.subregion.name : ""
                            ),
                            item.address.street,
                            item.address.city,
                            item.address.state,
                            item.address.country,
                            item.address.zipcode
                        ),
                        //item.emailpreferenceforcommunication,
                        //item.address; therapist_address;
                        // item.appoinment_preference: appoinment_preference,
                        item.appoinment_preference,
                        item.notification_enabled,
                        item.therapist_notes,

                        // start_date_time: condition.startdate,
                        // end_date_time: condition.enddate,
                        // served_regions: condition.servedregion
                    );
                });
            });
    }

    // },
    //{ headers: this.authService.headers }).map(res => res);

    // };

    get_all_available_services(condition: any): Observable<service[]> {
        let apilink = env.environment.serviceuri + "/service";
        return this.http.get<any>(apilink)//.map(res => res);
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new service(
                        item._id,
                        item.name,
                        item.image,
                        item.cost,
                        item.qty,
                        item.service_subtotal,
                        item.currency,
                        item.duration,
                        item.notes
                    )
                })
            });
    }

    get_all_service_addon() {
        let apilink = env.environment.serviceuri + "/service_addon";
        return this.http.get<any>(apilink)//.map(res => res);
            .map(res => {
                return res.ResponseMessage.map(item => {
                    return new service_addons(
                        item._id,
                        item.name,
                        item.duration,
                        item.cost,
                        item.qty,
                        item.service_addons_subtotal,
                        item.notes
                    )
                });
            });

    }


    create_appoinment(Customer: any, service, appointmentStatus, therapistArr, serviceAddOnData, conditionArr, ManualItem, appointmentform, notes, Total,
        CfieldArrayT, CfieldArrayC, RfieldArrayT, RfieldArrayC) {
        //debugger;
        var appsts = appointmentStatus.name;
        if (!appsts) {
            appointmentStatus = {
                name: "Active", icon: "fa-check",
                font_color: "2F2F2F", color: "5610AD"
            };
        }
        let apilink = env.environment.serviceuri + "/appoinment";
        return this.http.post<any>(apilink,
            {
                customer: Customer,
                appointment_statuses: appointmentStatus,
                start_date_Time: conditionArr.startdate,
                end_date_Time: conditionArr.enddate,
                therapist: therapistArr,
                service: service,
                service_addons: serviceAddOnData,
                manual_enteries: ManualItem,
                therapist_availability: therapistArr,
                tip: appointmentform.gratuity,
                total_cost: Total,
                grand_total_cost: '',
                notes: notes,
                work_order_notes: appointmentform.worknotes,
                privacy_notes: appointmentform.privatenotes,
                invoice_notes: appointmentform.invoicenotes,
                summary: appointmentform.summarynotes,
                user: this.authService.user,
                CfieldArrayT: CfieldArrayT,
                CfieldArrayC: CfieldArrayC,
                RfieldArrayT: RfieldArrayT,
                RfieldArrayC: RfieldArrayC
            }).map(res => res);
    }
    customer_filter(condition) {
        //debugger;
        let apilink = env.environment.serviceuri + "/customer/filter";
        return this.http.post<any>(apilink,
            condition).map(res => res);
    }
    get_all_regions() {
        // let apilink = env.environment.serviceuri + "/region/region";
        console.log('aaaaa');

        return this.http.get<any>(`${this.URL}/region/region`).map(res => res);
    }
    get_all_subregion() {

        let apilink = env.environment.serviceuri + "/region/subregion";
        return this.http.get<any>(apilink).map(res => res);
    }
    get_all_subregion_by_regionId(regionId: string) {
        let apilink = env.environment.serviceuri + "/region/subregion/" + regionId;
        return this.http.get<any>(apilink).map(res => res);
    }
    create_customer(image, customers, region, customertype) {
        let apilink = env.environment.serviceuri + "/customer";
        // return this.http.post(apilink,
        //     ).map(res => res);

        let params = {
            customertype: customertype,// for this have to pass type from frontend insted of id
            companyname: customers.companyname,
            firstname: customers.firstname,
            lastname: customers.lastname,
            imagename: image,
            email: customers.email,
            emailpreferenceforcommunication: customers.emailpreferenceforcommunication,
            phonepreferenceforcommunication: customers.phonepreferenceforcommunication,
            messagepreferenceforcommunication: customers.messagepreferenceforcommunication,
            address: [{
                region: { _id: customers.region.regionId, name: region },
                subregion: { _id: customers.sub_region ? customers.sub_region._id : null, name: customers.sub_region ? customers.sub_region.name : null },
                address_name: customers.addressname,
                street1: customers.homestreet,
                city: customers.homecity,
                state: customers.homestate,
                zipcode: customers.homezip,
                default: true
            },
            {
                street2: customers.billingstreet,
                city: customers.billingcity,
                state: customers.billingstate,
                zipcode: customers.billingzip,
                default: false
            }],
            contacts: [
                {
                    'contact_name': customers.firstname + ' ' + customers.lastname,
                    phone: [{ phone: customers.workphone, default: true }, { phone: customers.homephone, default: false }],
                    email: customers.email,
                    mobileno: customers.cellphone,
                    default: true
                }

            ],

            user: this.authService.user
        };

        let httpParams = new HttpParams();
        Object.keys(params).forEach((key) => {
            if (key && params[key]) {
                httpParams = httpParams.append(`${key}`, params[key]);
            }
        });
        console.log(httpParams);
        

        return this.http.post(apilink, params).pipe(
            map((res: any) => res),
            catchError(this.handleError),
        );

    }
    delete_appoinment_by_Id() {
        let apilink = env.environment.serviceuri + "/appoinment/";
        return this.http.delete<any>(apilink).map(res => res);
    }

    get_notification_label() {
        let apilink = env.environment.serviceuri + "/notification_frequency";
        return this.http.get<any>(apilink).map(res => res);
    }

}