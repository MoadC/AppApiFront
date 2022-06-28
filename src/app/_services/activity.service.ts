import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../_interfaces/activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivites(): Observable<Activity[]> {
    return this.http.get<Activity[]>("https://localhost:5001/api/Activity/All_Activities");
  }
  PostActivity(Activity: Activity): Observable<Activity[]> {
    return this.http.post<Activity[]>("https://localhost:5001/api/Activity/Add_Activity", Activity);
  }
  getOneActivity(id: number) {
    return this.http.get("https://localhost:5001/api/Activity/" + id);
  }
  DeleteActivity(id: number): Observable<Activity[]> {
    return this.http.delete<Activity[]>("https://localhost:5001/api/Activity/" + id);
  }
  UpdateActivity(id: number, Activity: Activity): Observable<Activity[]> {
    return this.http.put<Activity[]>("https://localhost:5001/api/Activity/" + id, Activity);
  }
}
