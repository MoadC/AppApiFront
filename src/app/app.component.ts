import { Component } from '@angular/core';
import {AuthGuardService} from "./auth-guard-service";
import {User} from "./_interfaces/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppApiFront';
  opened: boolean = true;

  toggle() {
    this.opened = !this.opened;
}

  name = '';
  role = '';


  constructor(private authService: AuthGuardService) {
  }

  isAuthenticated: boolean;

  logout(){
    this.authService.logout();
  }
  

  ngOnInit() {
    this.setCurrentUser();
    this.authService.currentUser$.subscribe(data => {
      console.log(data);
      this.name = data.name;
      this.role = data.roles[0];
    })
    this.authService.isAuthenticateSubject.subscribe(value => {
      console.log(this.authService.isAuthenticate);
      this.isAuthenticated = this.authService.isAuthenticate;
    });
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.setCurrentUser(user);
    }
  }
}
