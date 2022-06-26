import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>("https://localhost:5001/api/Location/All_Locations");
  }
  PostLocation(Location: Location): Observable<Location[]> {
    return this.http.post<Location[]>("https://localhost:5001/api/Location/Add_Location", Location);
  }
  getOneLocation(id: number) {
    return this.http.get("https://localhost:5001/api/Location/" + id);
  }
  DeleteLocation(id: number): Observable<Location[]> {
    return this.http.delete<Location[]>("https://localhost:5001/api/Location/" + id);
  }
  UpdateLocation(id: number, Location: Location): Observable<Location[]> {
    return this.http.put<Location[]>("https://localhost:5001/api/Location/" + id, Location);
  }
}
