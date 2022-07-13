import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthGuardService} from "./auth-guard-service";

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild{
  constructor( private authService : AuthGuardService , private router : Router) {
  }
  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    if (this.authService.isAuthenticate) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute , state);
  }

}
