import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService{

  loggedIn = false;

  constructor(private http : HttpClient) {
  }

  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 500);
      }
    );
  }

  login() : Observable<any>{

    let employee = {'username' : 'em1User', 'password' : 'User123@'};
    const headers = new HttpHeaders().set('Content-Type','application/json');

   return  this.http.post<any>("https://localhost:5001/api/Account/login",
     JSON.stringify(employee),{ headers :headers });
  }

  decodeToken(token : string){

  }


  logout(){
    confirm('are you sure !!!');
    this.loggedIn = false;
  }

}
