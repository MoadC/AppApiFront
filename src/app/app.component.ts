import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthGuardService} from "./auth-guard-service";
import {User} from "./_interfaces/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy,AfterViewInit{
  title = 'AppApiFront';
  opened: boolean = true;
  currentUser : Subscription;
  isAuthenticatedSubject : Subscription;


  toggle() {
    this.opened = !this.opened;
}
  name = '';
  role = '';

  constructor(private authService: AuthGuardService) {
  }

  isAuthenticated: boolean ;

  logout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.setCurrentUser();
    this.currentUser =  this.authService.currentUser$.subscribe(data => {
      console.log(data);
      this.name = data?.name;
      this.role = data?.roles[0];
    });
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.setCurrentUser(user);
    }
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
    this.isAuthenticatedSubject.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.isAuthenticatedSubject = this.authService.isAuthenticateSubject.subscribe(value => {
      setTimeout( () =>
      {
        this.isAuthenticated = value
      } ,100)

    });
  }
}
