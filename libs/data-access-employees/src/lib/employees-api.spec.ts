import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';

import {
  employees as employeesStub,
  newEmployee as employeeStub,
} from './employees.stub';
import { EmployeesApiService } from './employees-api.service';

describe('EmployeesApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: EmployeesApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesApiService],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service =  TestBed.inject(EmployeesApiService);
  }));

  afterEach(waitForAsync(() => {
    httpTestingController.verify();
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getEmployeesPage', () => {
    service.getEmployeesPage({ page: '1' })
      .subscribe(data => expect(data).toEqual(
        { employees: employeesStub.slice(0,9), count: employeesStub.length }
      ));

    const req = httpTestingController.expectOne('/employees?page=1');
    expect(req.request.method).toEqual('GET');

    req.flush({ data: employeesStub.slice(0,9), count:  employeesStub.length});
  });

  it('createEmployee', () => {
    service.createEmployee(employeeStub)
      .subscribe(data => expect(data).toEqual({ data: { id: 14 }}));

    const req = httpTestingController.expectOne('/employees');
    expect(req.request.method).toEqual('POST');

    req.flush({ data: { id: 14 }});
  });

  it('deleteEmployee', () => {
    service.deleteEmployee(13)
      .subscribe(data => expect(data).toBeFalsy());

    const req = httpTestingController.expectOne('/employees/13');
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  it('updateEmployee', () => {
    const updatedEmployee = {
      id: 13,
      name: employeeStub.name,
      surname: employeeStub.surname,
      patronymic: employeeStub.patronymic,
      salary: employeeStub.salary,
      room: employeeStub.room,
      hours: employeeStub.hours,
      email: employeeStub.email,
    }
    service.updateEmployee(13, updatedEmployee)
      .subscribe(data => expect(data).toEqual({ data: { id: 13 }}));

    const req = httpTestingController.expectOne('/employees/13');
    expect(req.request.method).toEqual('PATCH');

    req.flush({ data: { id: 13 } });
  });

  it('getEmployee', () => {
    service.getEmployee(13)
      .subscribe(data => expect(data).toEqual(employeesStub.find(employee => employee.id === 13)
    ));

    const req = httpTestingController.expectOne('/employees/13');
    expect(req.request.method).toEqual('GET');

    req.flush({data: employeesStub.find(employee => employee.id === 13)});
  });
});
