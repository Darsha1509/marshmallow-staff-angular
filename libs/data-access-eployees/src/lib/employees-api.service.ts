import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  getEmployeesPage(objectParams: {
    page?: string; 
    search?: string;
    minSalary?: string;
    maxSalary?: string;
    minHours?: string;
    maxHours?: string;
  }): Observable<{employees: Employee[]; count: number}>{
    return this.http.get<{ data: Employee[], count: number}>(`/employees`, {params: objectParams}).pipe(   
      map(res => {
        return {employees: res.data, count: res.count}
      })
    );
  }

  createEmployee(employee: {
    name: string;
    surname: string;
    patronymic: string;
    salary: number;
    room: number;
    hours: number;
    email: string;
  }) {
    return this.http.post<{data: {id: number}}>('/employees', employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`/employees/${id}`);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.patch(`/employees/${id}`, employee);
  }

  getEmployee(id: number) {
    return this.http.get<{data: Employee | null}>(`/employees/${id}`).pipe(
      map(res => res.data)
    );
  }
}