import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EmployeeComponent, FeatureEmployeeModule } from '@marshmallow-land/feature-employee';
import {
  EmployeesQuery,
  EmployeesService,
  employees,
} from '@marshmallow-land/data-access-eployees';


describe('EmployeeComponent', () => {
  let employeesQuery: EmployeesQuery;
  let employeesService: EmployeesService;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<EmployeeComponent>;
  let component: EmployeeComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FeatureEmployeeModule],
      providers: [
        EmployeeComponent,
        EmployeesQuery,
        {
          provide: EmployeesService,
          useValue: {
            getEmployee: jest.fn(() => of(employees[12])),
          },
        },
        {
          provide:ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
            },
          },
        },
      ],
    });
  }));

  beforeEach(() => {
    employeesQuery = TestBed.inject(EmployeesQuery);
    employeesService = TestBed.inject(EmployeesService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
  });

  it('current employee, employee exist in store', () => {
    employeesQuery.getEntity = jest.fn(() => employees[12]);
    activatedRoute.snapshot.params = {
      employeeId: 13,
    };
    component.ngOnInit();
    expect(component.employee.name).toBe('Alice');
  });

  it('current employee, get employee from back', () => {
    activatedRoute.snapshot.params = {
      employeeId: 13,
    };
    component.ngOnInit();
    expect(component.employee.name).toBe('Alice');
  });

  it('new employee', () => {
    component.ngOnInit();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
    expect(component.newEmployee.get('name').value).toBeFalsy();
  });
});
