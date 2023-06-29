import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private AppUrl = "https://localhost:7193/";
  private ApiUrl = "api/tarjeta/";
  constructor(private http: HttpClient) { }

  getTarjetas(): Observable<any> {
    return this.http.get(this.AppUrl + this.ApiUrl);
  }

  deleteTarjeta(id: number): Observable<any>{
    return this.http.delete(this.AppUrl + this.ApiUrl + id);
  }

  saveTarjeta(tarjeta: any): Observable<any>{
    return this.http.post(this.AppUrl + this.ApiUrl, tarjeta);
  }


  updateTarjeta(id:number, tarjeta: any): Observable<any>{
    return this.http.put(this.AppUrl + this.ApiUrl+ id, tarjeta)
  }

}
