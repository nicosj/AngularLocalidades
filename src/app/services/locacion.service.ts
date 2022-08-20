import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocacionService {
  private url="https://localhost:5001/"
  private apiUrl="api/localidad/"
  constructor(private http:HttpClient) { }
  getAlL(): Observable<any>{
    return this.http.get(this.url+this.apiUrl)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(this.url+this.apiUrl+id)
  }
  save(lugar :any):Observable <any> {
    return this.http.post(this.url+this.apiUrl,lugar)
  }
  update(lugar:any):Observable<any>{
    return this.http.put(this.url+this.apiUrl,lugar)
  }
}
