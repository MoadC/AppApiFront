import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {
 employees : any;

  constructor(private http : HttpClient) { }

  getEmployees(){
    this.http.get("https://localhost:5001/api/Employer/all_employers").subscribe(data=>{
      this.employees = data;
      console.log(this.employees);
    });
  }

}
