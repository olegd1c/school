import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (true) {
            return true;
        }
        // not logged in so redirect to login page
        //this.router.navigate(['/auth']);
        //return false;
    }
}