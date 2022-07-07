import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  isAuthenticate : boolean;

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
        return this.isAuthenticate;
      }else {
        console.log(this.isAuthenticate);
        return this.isAuthenticate =value;
      }
    }

}


