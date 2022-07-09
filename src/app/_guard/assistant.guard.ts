import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {AuthGuardService} from "../auth-guard-service";

@Injectable({
  providedIn: 'root'
})
export class AssistantGuard implements CanActivate {
  constructor(private authGuardService : AuthGuardService , private router : Router) {
  }
  canActivate(): Observable<boolean> {
    return this.authGuardService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes('Assistant') || user.roles.includes('ChefEquipe') || user.roles.includes('Admin')) {
          return true;
        }else {
          this.router.navigate(['/unauthorized']);
        }
      })
    )
  }
}
