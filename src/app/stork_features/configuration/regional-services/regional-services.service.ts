import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';

@Injectable()
export class RegionalServicesService {
    constructor(private http: Http, private authService: AuthService) {
    }

    get_all_regions() {
        let apilink = env.environment.serviceuri + "/region/region";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all_subregions(regionId: string) {
        let apilink = env.environment.serviceuri + "/region/subregion/" + regionId;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all() {
        let apilink = env.environment.serviceuri + "/service";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    create_service(serviceForm, region) {
        let apilink = env.environment.serviceuri + "/service";
        return this.http.post(apilink,
            {
                service_location_type: serviceForm.service_location_type,
                region: { _id: region._id, region: region.name },
                sub_region: { _id: serviceForm.sub_region._id, sub_region: serviceForm.sub_region.name },
                service_name: serviceForm.name,
                // imagename: serviceForm.imagename,
                cost: serviceForm.cost,
                duration: serviceForm.duration,
                notes: serviceForm.notes,
                 user: this.authService.user
            },
            { headers: this.authService.headers }).map(res => res.json());


    }
    delete_service_by_Id(id: string) {
        let apilink = env.environment.serviceuri + "/service/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    update_service(serviceForm, region, id) {
        let apilink = env.environment.serviceuri + "/service";
        return this.http.put(apilink,
            {
                _id: id,
                service_location_type: serviceForm.service_location_type,
                region: { _id: region._id, region: region.name },
                sub_region: { _id: serviceForm.sub_region._id, sub_region: serviceForm.sub_region.name },
                service_name: serviceForm.name,
                // imagename: serviceForm.imagename,
                cost: serviceForm.cost,
                duration: serviceForm.duration,
                notes: serviceForm.notes,
                is_active: true,
                is_deleted: false
            },
            { headers: this.authService.headers }).map(res => res.json());
    }


}