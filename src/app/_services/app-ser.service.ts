import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../_interfaces/service';

@Injectable({
  providedIn: 'root'
})

  //angular service of services in our application (medical / psycho / etc)
export class AppSerService {

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>("https://localhost:5001/api/Service/all_services");
  }
  PostService(Service: Service): Observable<Service[]> {
    return this.http.post<Service[]>("https://localhost:5001/api/Service/add_service", Service);
  }
  getOneService(id: number) {
    return this.http.get("https://localhost:5001/api/Service/" + id);
  }
  DeleteService(id: number): Observable<Service[]> {
    return this.http.delete<Service[]>("https://localhost:5001/api/Service/" + id);
  }
  UpdateService(id: number, Service: Service): Observable<Service[]> {
    return this.http.put<Service[]>("https://localhost:5001/api/Service/" + id, Service);
  }
}
