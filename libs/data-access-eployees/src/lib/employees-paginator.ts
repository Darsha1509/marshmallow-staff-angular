import { InjectionToken, inject } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';

import { EmployeesQuery } from './employees.query';

export const EMPLOYEES_PAGINATOR = new InjectionToken('EMPLOYEES_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const employeesQuery = inject(EmployeesQuery);
    return new PaginatorPlugin(employeesQuery).withControls().withRange();
  }
})