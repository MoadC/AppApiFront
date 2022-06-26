import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiaire } from '../_interfaces/beneficiaire';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  constructor(private http : HttpClient) { }

  getBeneficiaries(): Observable<Beneficiaire[]>{
    return this.http.get<Beneficiaire[]>("https://localhost:5001/api/Immigrant/AllImmigrants");
  }
  PostBeneficiary(Beneficiary : Beneficiaire) : Observable<Beneficiaire[]>{
    return this.http.post<Beneficiaire[]>("https://localhost:5001/api/Immigrant/add_Immigrant",Beneficiary);
  }
  getOneBeneficiary(id : number){
    return this.http.get("https://localhost:5001/api/Immigrant/"+id);
  }
  DeleteBeneficiary(id : number) : Observable<Beneficiaire[]>{
    return this.http.delete<Beneficiaire[]>("https://localhost:5001/api/Immigrant/"+id);
  }
  UpdateBeneficiary(id : number , beneficiaire : Beneficiaire) : Observable<Beneficiaire[]>{
    return this.http.put<Beneficiaire[]>("https://localhost:5001/api/Immigrant/"+id,beneficiaire);
  }
}
