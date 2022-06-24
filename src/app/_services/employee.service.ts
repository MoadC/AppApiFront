import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {
 employees = new Subject<any>();


  constructor(private http : HttpClient) { }

  getEmployees(){
    this.http.get("https://localhost:5001/api/Employer/all_employers").subscribe(data=>{
     // this.employees = data;
      this.employees.next(data);
    });
    console.log(this.employees);
    return this.employees;
  }
  PostEmployee(Employe : any){
    this.http.post("https://localhost:5001/api/Employer/add_employer",Employe).subscribe(data=>{
      //this.employees = data;
      console.log(Employe);
    });
  }
  getOneEmployees(id : number){
    this.http.get("https://localhost:5001/api/Employer/"+id).subscribe(data=>{
      //this.employees = data;
      console.log(this.employees);
    });
  }



}
