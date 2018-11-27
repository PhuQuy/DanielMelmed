import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';


@Injectable()
export class CustomerService {

    constructor(private http: Http, private authService: AuthService) {
    }

    get_all() {
        let apilink = env.environment.serviceuri + "/customer";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

    }

    create_customer(image, customers, region, customertype) {
        let apilink = env.environment.serviceuri + "/customer";
        return this.http.post(apilink,
            {
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
                    region: { _id: customers.sub_region.regionId, name: region },
                    subregion: { _id: customers.sub_region._id, name: customers.sub_region.name },
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
                        mobileno:customers.cellphone,
                        default: true
                    }

                ],
                
                user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());

    }

    get_all_regions() {
        let apilink = env.environment.serviceuri + "/region/region";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all_subregion() {

        let apilink = env.environment.serviceuri + "/region/subregion";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all_subregion_by_regionId(regionId: string) {
        let apilink = env.environment.serviceuri + "/region/subregion/" + regionId;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }


    get_customer_by_Id(id) {
        let apilink = env.environment.serviceuri + "/customer/" + id;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    update_customer(customer: any) {
        let apilink = env.environment.serviceuri + "/customer";
        return this.http.put(apilink,
            {
                _id:customer._id,
                customertype: customer.customertype,// for this have to pass type from frontend insted of id
                companyname: customer.companyname,
                firstname: customer.firstname,
                lastname: customer.lastname,
                imagename: customer.imagename,
                email: customer.email,
                emailpreferenceforcommunication: customer.emailpreferenceforcommunication,
                phonepreferenceforcommunication: customer.phonepreferenceforcommunication,
                messagepreferenceforcommunication: customer.messagepreferenceforcommunication,
                address: customer.address,
                contacts: customer.contacts,
                mobileno:customer.mobileno,
                customer_notes:customer.customer_notes,
                admin_notes:customer.admin_notes,
                isdeleted: false,
                isactive: true,
                user: this.authService.user

            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    // delete_therapist_by_Id(id){
    //     let apilink = env.environment.serviceuri + "/therapist/" + id;
    //     return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    // }
    // get_all_services() {
    //     let apilink = env.environment.serviceuri + "/service";
    //     return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    // }
}
