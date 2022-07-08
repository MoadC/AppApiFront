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

  constructor(private authService: AuthGuardService) {
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.setCurrentUser(user);
    }
  }
}
