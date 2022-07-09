import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./_interfaces/user";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService{

  constructor(private http : HttpClient , private router : Router ) { }
  isAuthenticate : boolean;
  isAuthenticateSubject = new Subject<boolean>();
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

 /* user = {
    userName: "test1",
    password : "App123@"
  }
*/
  getUser(user : User) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post<any>("https://localhost:5001/api/Account/login",
      JSON.stringify(user),{ headers :headers });
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
    this.currentUserSource.next(user);
  }



  logout() {
    Swal.fire({
      title: 'Are you sure want to log out?',
      text: 'You will have to authenticate again later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, Log me out!',
      cancelButtonText: 'No, let me stay'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('user');
        this.isAuthenticate = false;
        this.router.navigate(['/']);
        this.currentUserSource.next(null);
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }


  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}

