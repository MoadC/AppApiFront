import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthGuardService} from './auth-guard-service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild{
  constructor( private authService : AuthGuardService , private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authService.isAuthenticated().then(
      (authentication: boolean) => {
        if (authentication) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute , state);
  }

}
