import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EmployeesStore, EmployeesState } from './employees.store';

@Injectable({ providedIn: 'root' })
export class EmployeesQuery extends QueryEntity<EmployeesState> {
  constructor(protected store: EmployeesStore) {
    super(store);
  }
}