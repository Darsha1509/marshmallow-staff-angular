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

  getPage(page: string, search = ''): Observable<PaginationResponse<Employee>> {
    return this.api.getEmployeesPage(page, search).pipe(
      map(res => {
        return {
          perPage: res.count < PER_PAGE ? res.count : PER_PAGE,
          lastPage: res.count < PER_PAGE ? 1 : Math.ceil(res.count / PER_PAGE),
          currentPage: +page,
          total: +res.count,
          data: res.employees
        }
      })
    )
  }
}