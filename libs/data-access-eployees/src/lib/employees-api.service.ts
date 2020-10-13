import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  getEmployeesPage(page: string, search: string): Observable<{employees: Employee[]; count: number}>{
    return this.http.get<{ data: Employee[], count: number}>(`/employees`, {params: { page, search }}).pipe(
      map(res => {
        return {employees: res.data, count: res.count}
      })
    );
  }
}