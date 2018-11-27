import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as env from 'environments/environment';
import { AuthService } from 'app/stork_features/shared/auth.service';


@Injectable()
export class CompanyInfoService {

  constructor(private http: Http, private authService: AuthService) {
  }

  get_company_info() {
    let apilink = env.environment.serviceuri + "/company_info";
    return this.http.get(apilink, { headers: this.authService.headers }).map(res => res.json());

  }

  create_company_info(company: any) {
    let apilink = env.environment.serviceuri + "/company_info";
    return this.http.post(apilink,
      {
        name: company.name,
        firstname: company.firstname,
        lastname: company.lastname,
        title: company.title,
        phone: company.phone,
        email: company.email,
        street: company.street,
        city: company.city,
        state: company.state,
        zipcode: company.zipcode,
        country: "US",
        user: this.authService.user
      },
      { headers: this.authService.headers }).map(res => res.json());

  }

  update_company_info(company: any) {
    let apilink = env.environment.serviceuri + "/company_info";
    return this.http.put(apilink,
      {
        _id: company._id,
        name: company.name,
        firstname: company.firstname,
        lastname: company.lastname,
        title: company.title,
        phone: company.phone,
        email: company.email,
        street: company.street,
        city: company.city,
        state: company.state,
        zipcode: company.zipcode,
        country: "US",
        user: this.authService.user
      },
      { headers: this.authService.headers }).map(res => res.json());

  }

}
