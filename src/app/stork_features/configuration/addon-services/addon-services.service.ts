import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';

@Injectable()
export class AddonService {
    constructor(private http: Http, private authService: AuthService) {
    }
    create_service_addon(name: string, cost: string, duration: string, notes: string) {
        let apilink = env.environment.serviceuri + "/service_addon";
        return this.http.post(apilink, { name: name.trim(), cost: cost, duration: duration, notes: notes, user: this.authService.user }, { headers: this.authService.headers }).map(res => res.json());
    }
    get_all() {
        let apilink = env.environment.serviceuri + "/service_addon";
        return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
    update_service_addon(id: string, name: string, cost: string, duration: string, notes: string) {
        let apilink = env.environment.serviceuri + "/service_addon";
        return this.http.put(apilink, { _id: id, name: name.trim(), cost: cost, duration: duration, notes: notes, user: this.authService.user, is_deleted: false, is_active: true }, { headers: this.authService.headers }).map(res => res.json());
    }
    delete_service_addon_by_Id(id: string) {
        debugger;
        let apilink = env.environment.serviceuri + "/service_addon/" + id;
        return this.http.delete(apilink, { headers: this.authService.headers }).map(res => res.json());
    }
}