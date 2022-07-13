import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LocationInterface} from "../_interfaces/locationInterface";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<LocationInterface[]> {
    return this.http.get<LocationInterface[]>("https://localhost:5001/api/Location/All_Locations");
  }
  PostLocation(Location: LocationInterface): Observable<LocationInterface[]> {
    return this.http.post<LocationInterface[]>("https://localhost:5001/api/Location/Add_Location", Location);
  }
  getOneLocation(id: number) {
    return this.http.get("https://localhost:5001/api/Location/" + id);
  }
  DeleteLocation(id: number): Observable<LocationInterface[]> {
    return this.http.delete<LocationInterface[]>("https://localhost:5001/api/Location/" + id);
  }
  UpdateLocation(id: number, Location: LocationInterface): Observable<LocationInterface[]> {
    return this.http.put<LocationInterface[]>("https://localhost:5001/api/Location/" + id, Location);
  }
}
