import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthGuardService} from "../auth-guard-service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChefEquipeGuard implements CanActivate {
  constructor(private authGuardService : AuthGuardService , private router : Router) {
  }
  canActivate(): Observable<boolean> {
    return this.authGuardService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes('ChefEquipe')) {
          return true;
        }else {
          this.router.navigate(['/unauthorized']);
        }
      })
    )
  }

}
