import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //creating service
  constructor(private _http: HttpClient) { }
  //payload
  //Observables provide support for passing messages between parts of your application.
  //Observables push value changes to components and services that subscribe to changes.
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }
  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete('http://localhost:3000/employees/' + id);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.delete('http://localhost:3000/employees/' + id, data);
  }
}
