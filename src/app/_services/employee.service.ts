import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Employee} from "../_interfaces/employee";
import { Service } from '../_interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

  constructor(private http : HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("https://localhost:5001/api/Employer/all_employers");
  }
  PostEmployee(Employee : Employee) : Observable<Employee[]>{
    return this.http.post<Employee[]>("https://localhost:5001/api/Employer/add_employer",Employee);
  }
  getOneEmployees(id : number){
    return this.http.get("https://localhost:5001/api/Employer/"+id);
  }
  DeleteEmployee(id : number) : Observable<Employee[]>{
    return this.http.delete<Employee[]>("https://localhost:5001/api/Employer/"+id);
  }
  UpdateEmployee(id : number , Employee : Employee) : Observable<Employee[]>{
    return this.http.put<Employee[]>("https://localhost:5001/api/Employer/"+id,Employee);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>("https://localhost:5001/api/Service/all_services");
  }

}
