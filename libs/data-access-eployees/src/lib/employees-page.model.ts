import { Employee } from './employee.model';

export interface EmployeesPage {
  perPage: number;
  lastPage: number;
  currentPage: number;
  total: number;
  data: Employee[];
}