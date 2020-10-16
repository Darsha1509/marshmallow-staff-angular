import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EmployeeComponent } from './employee.component';
import { EmployeesQuery, EmployeesService, employees, newEmployee } from '@marshmallow-land/data-access-eployees';


describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let employeesQuery: EmployeesQuery;
  let employeesService: EmployeesService;
  let ativatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        EmployeeComponent,
        EmployeesQuery,
        EmployeesService,
        ActivatedRoute,
        Router,
      ],
    }).compileComponents();

    component = TestBed.inject(EmployeeComponent);
    employeesQuery = TestBed.inject(EmployeesQuery);
    employeesService = TestBed.inject(EmployeesService);
    ativatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  }));

  it('current employee, employee exist in store', () => {
    router.navigate(['/employees/13']);
    console.log(ativatedRoute.snapshot.params['employeeId']);
    employeesQuery.getEntity = jest.fn(() => employees[12]);
    expect(component.employee.name).toBe('Alice');
  });
});
