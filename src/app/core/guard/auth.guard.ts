import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public authService: AuthService,
        public router: Router
    ){ }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = window.localStorage.getItem("token");
        if (!token) {
          this.router.navigate(["/"]);
          return true;
        }
        this.authService.isLoggedIn(token).subscribe((res) => {

            console.log(res);
        });
        // this.router.navigate(["/"]);
        return true;
    }

}
