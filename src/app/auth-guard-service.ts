import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService{

  constructor(private http : HttpClient , private router : Router ) { }
  isAuthenticate : boolean;
  isAuthenticateSubject = new Subject<boolean>();

  user = {
    userName: "test1",
    password : "App123@"
  }

  getUser() : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post<any>("https://localhost:5001/api/Account/login",
      JSON.stringify(this.user),{ headers :headers });
  }

  login(value : boolean): boolean {
    if(value) {

      this.isAuthenticate = value;
      console.log(this.isAuthenticate);
      this.isAuthenticateSubject.next(this.isAuthenticate);
      return this.isAuthenticate;

    }else {
      console.log(this.isAuthenticate);
      this.isAuthenticateSubject.next(this.isAuthenticate);
      return this.isAuthenticate =value;
    }
  }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    //this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    confirm('are you sure !!!');
    this.isAuthenticate = false;
    this.router.navigate(['/']);
    // this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
    export interface User {
      username : string;
      token : string;
      roles : string[];
    }
