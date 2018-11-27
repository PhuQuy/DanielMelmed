import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';

@Injectable()
export class RegionsSubregionService {
    constructor(private http: Http, private authService: AuthService) {
    }

    get_all_regions() {
        let apilink = env.environment.serviceuri + "/region/region";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    create_region(region: string) {
        let apilink = env.environment.serviceuri + "/region/region";
        return this.http.post(apilink, { name: region.trim(), user: this.authService.user }, { headers: this.authService.headers }).map(res => res.json());
    }

    update_region(id: string, region: string) {
        let apilink = env.environment.serviceuri + "/region/region";
        return this.http.put(apilink, { _id: id, name: region.trim(), user: this.authService.user, is_deleted: false, is_active: true }, { headers: this.authService.headers }).map(res => res.json());
    }

    delete_region_by_Id(id: string) {
        let apilink = env.environment.serviceuri + "/region/region/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    get_all_subregions(regionId: string) {
        let apilink = env.environment.serviceuri + "/region/subregion/" + regionId;
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }

    create_subregion(regionId: string, subregion: string) {
        let apilink = env.environment.serviceuri + "/region/subregion";
        return this.http.post(apilink, { regionId: regionId, name: subregion.trim(), user: this.authService.user }, { headers: this.authService.headers }).map(res => res.json());
    }

    update_subregion(id: string, regionId: string, subregion: string) {
        let apilink = env.environment.serviceuri + "/region/subregion";
        return this.http.put(apilink, { _id: id, regionId: regionId, name: subregion.trim(), user: this.authService.user, is_deleted: false, is_active: true }, { headers: this.authService.headers }).map(res => res.json());
    }

    delete_subregion_by_Id(id: string) {
        let apilink = env.environment.serviceuri + "/region/subregion/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
}