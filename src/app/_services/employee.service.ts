import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Employee} from "../_interfaces/employee";

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
  }
  PostEmployee(Employee : Employee){
    this.http.post("https://localhost:5001/api/Employer/add_employer",Employee).subscribe(data=>{
      console.log(data);
    });
  }
  getOneEmployees(id : number){
    this.http.get("https://localhost:5001/api/Employer/"+id).subscribe(data=>{

      //console.log(this.employees);
    });
  }



}
