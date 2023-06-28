import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
//private apiServiceUrl='';
//    return this.http.get<Employee[]>(`${this.apiServiceUrl}/employee/all`);
  constructor(private http:HttpClient) { }

  public getEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.apiServiceUrl}/employee/all`);
  }

  public addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${environment.apiServiceUrl}/employee/add`,employee);
  }

  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${environment.apiServiceUrl}/employee/update`,employee);
  }

  public deleteEmployee(employeeId:number):Observable<void>{
    return this.http.delete<void>(`${environment.apiServiceUrl}/employee/delete/${employeeId}`);
  }
}
