import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from '@app/stork_features/shared/auth.service';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const token = user && user.token;
        let headers = token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        } : {
                'Content-Type': 'application/json',
            };

        // if (!request.url.endsWith('/media/uploads')) {
        //     headers = Object.assign(headers, { 'Content-Type': 'application/json' });
        // }

        request = request.clone({
            setHeaders: headers
        });
        return next.handle(request);
    }
}
