import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from 'app/stork_features/shared/auth.service';
import * as env from 'environments/environment';
import 'rxjs/add/operator/map';


@Injectable()
export class TherapistsService {

    constructor(private http: Http, private authService: AuthService) {
    }

    get_all() {
        let apilink = env.environment.serviceuri + "/therapist";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

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

    get_therapist_by_Id(id) {
        let apilink = env.environment.serviceuri + "/therapist/" + id;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    get_all_services() {
        let apilink = env.environment.serviceuri + "/service";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    create_therapist(therapistform: any, phone, region, gender, servedregion, image) {
        let apilink = env.environment.serviceuri + "/therapist";
        return this.http.post(apilink,
            {
                firstname: therapistform.firstname,
                lastname: therapistform.lastname,
                imageName: image,
                gender: gender,
                email: therapistform.email,
                phone: phone,
                address: {
                    region: { _id: therapistform.sub_region.regionId, name: region },
                    subregion: { _id: therapistform.sub_region._id, name: therapistform.sub_region.name },
                    street: therapistform.street,
                    city: therapistform.city,
                    state: therapistform.state,
                    zipcode: therapistform.zip
                },
                services: therapistform.serviceData,
                served_regions: servedregion,
                user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());

    }

    update_therapist(therapist: any) {
        let apilink = env.environment.serviceuri + "/therapist";
        return this.http.put(apilink,
            {
                _id: therapist._id,
                firstname: therapist.firstname,
                lastname: therapist.lastname,
                imagename: therapist.imagename,
                gender: therapist.gender,
                email: therapist.email,
                phone: therapist.phone,
                address: therapist.address,
                appoinment_preference: therapist.appoinment_preference,
                other: therapist.other,
                licenses: therapist.licenses,
                supplies: therapist.supplies,
                assignment_types: therapist.assignment_types,
                services: therapist.services,
                served_regions: therapist.served_regions,
                admin_notes: therapist.admin_notes,
                therapist_notes: therapist.therapist_notes,
                notification_enabled: therapist.notification_enabled,
                isdeleted: therapist.isdeleted,
                isactive: therapist.isactive,
                user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());
    }

    delete_therapist_by_Id(id) {
        let apilink = env.environment.serviceuri + "/therapist/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

}
