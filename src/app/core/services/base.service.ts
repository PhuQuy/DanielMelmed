import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { throwError } from 'rxjs';
import { AuthService } from '@app/stork_features/shared/auth.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected URL = '';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        this.URL = `${environment.serviceuri}`;
    }

    protected handleError(error: any) {
        return throwError(error);
    }

    protected getUrl(params): string {
        let result = '';
        let first = true;
        params.forEach(param => {
            if (param.value != null && param.value.length != 0) {
                if (first) {
                    result += `?${param.name}=${param.value}`;
                } else {
                    result += `&${param.name}=${param.value}`;
                }
                first = false;
            }
        });
        return result;
    }
}
