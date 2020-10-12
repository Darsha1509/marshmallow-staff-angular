import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Employee } from './empoyee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]>{
    return this.http.get<{ data: Employee[]}>("/employees").pipe(
      map(res => res.data)
    );
  }
}