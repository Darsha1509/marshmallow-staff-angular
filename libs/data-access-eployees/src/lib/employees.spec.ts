import { TestBed } from '@angular/core/testing';
import { cold, hot } from '@nrwl/angular/testing';

import { EmployeesService } from './employees.service';
import { EmployeesApiService } from './employees-api.service';
import { employees, newEmployee } from './employees.stub';

const employeesStub = {
  employees,
  count: employees.length,
};

describe('EmployeesService', () => {
  let service: EmployeesService;
  let apiService: EmployeesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesService, {
        provide: EmployeesApiService,
        useValue: {},
      }],
    });
    apiService = TestBed.inject(EmployeesApiService);
    service = TestBed.inject(EmployeesService);
  });

  it('getEmployeesPage', () => {
    const pageStub = {
      perPage: 10,
      lastPage: 2,
      currentPage: 1,
      total: 13,
      data: employees,
    };

    const source = cold('-a-|', { a: employeesStub });
    const expected = hot('-a-|', { a: pageStub });

    apiService.getEmployeesPage = jest.fn(() => source);
    expect(service.getPage({ page: '1' })).toBeObservable(expected);
  });

  it('createEmployee', () => {
    const createdDataIdStub = { data: { id: 14 } };

    const source = cold('-a-|', { a: createdDataIdStub });
    const expected = hot('-a-|', { a: createdDataIdStub });

    apiService.createEmployee = jest.fn(() => source);
    expect(service.createEmployee(newEmployee)).toBeObservable(expected);
  });

  it('deleteEmployee', () => {
    const source = cold('-a-|', { a: null });
    const expected = hot('-a-|', { a: null });

    apiService.deleteEmployee = jest.fn(() => source);
    expect(service.deleteEmployee(13)).toBeObservable(expected);
  });

  it('updateEmployee', () => {
    const updatedDataIdStub = { data: { id: 13 } };
    const newDataEmployee = { ...newEmployee, id: 13 };

    const source = cold('-a-|', { a: updatedDataIdStub });
    const expected = hot('-a-|', { a: updatedDataIdStub });

    apiService.updateEmployee = jest.fn(() => source);
    expect(service.updateEmployee(13, newDataEmployee)).toBeObservable(expected);
  });

  it('getEmployee', () => {
    const targetEmployee = employees[12];

    const source = cold('-a-|', { a: targetEmployee });
    const expected = hot('-a-|', { a: targetEmployee });

    apiService.getEmployee = jest.fn(() => source);
    expect(service.getEmployee(13)).toBeObservable(expected);
  });
});
