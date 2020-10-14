import { Injectable, Inject } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@datorama/akita';

import { EmployeesApiService } from './employees-api.service';
import { Employee } from '@marshmallow-land/data-access-eployees';

export const PER_PAGE = 10;

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  constructor(private api: EmployeesApiService) {}

  getPage(objectParams: {
    page?: string; 
    search?: string;
    minSalary?: string;
    maxSalary?: string;
    minHours?: string;
    maxHours?: string;
  }): Observable<PaginationResponse<Employee>> {
    return this.api.getEmployeesPage(objectParams).pipe(
      map(res => {
        return {
          perPage: res.count < PER_PAGE ? res.count : PER_PAGE,
          lastPage: res.count < PER_PAGE ? 1 : Math.ceil(res.count / PER_PAGE),
          currentPage: +objectParams.page,
          total: +res.count,
          data: res.employees
        }
      })
    )
  }
}