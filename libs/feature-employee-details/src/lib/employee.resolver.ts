import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';

import { EmployeesService, EmployeesQuery } from '@marshmallow-land/data-access-employees';

@Injectable()
export class EmployeeResolver implements Resolve<boolean> {
  constructor (
    private employeesService: EmployeesService,
    private employeesQuery: EmployeesQuery,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params['employeeId'];

    return id !== 'new' ? this.employeesQuery.selectEntity(id).pipe(
      take(1),
      switchMap((data): Observable<boolean> => {
        if (data) {
          return of(true);
        }

        if (!data) {
          return this.employeesService.getEmployee(id).pipe(
            tap((employee) => {
              this.employeesService.setEmployee(employee);
            }),
            switchMap(() => of(true)),
          );
        }
      },
    )) : of(null);
  }

}
