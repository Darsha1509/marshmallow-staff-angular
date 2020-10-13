import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface EmployeesState extends EntityState<Employee> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'employees', resettable: true })
export class EmployeesStore extends EntityStore<EmployeesState> {
  constructor() {
    super();
  }
}