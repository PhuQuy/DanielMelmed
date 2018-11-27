import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public router: Router
    ) { }
    canActivate(): boolean {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
