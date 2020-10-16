import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee, EmployeesQuery, EmployeesService} from'@marshmallow-land/data-access-eployees';

@Component({
  selector: 'marshmallow-land-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  newEmployee: FormGroup;
  employeeId: number | null;
  employee: Employee;
  createEmployeeSubscription: Subscription;
  deleteEmployeeSubscription: Subscription;
  updateEmployeeSubscription: Subscription;
  getEmployeeSubscription: Subscription;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private employeesQuery: EmployeesQuery,
    private employeesService: EmployeesService,
  ) { }

  ngOnInit(): void {
    this.employeeId = this.activatedRouter.snapshot.params['employeeId'] || null;
    this.newEmployee = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      salary: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      room: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      hours: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      email: new FormControl('', Validators.required),
    });

    if (this.employeeId) {
      this.employee = this.employeesQuery.getEntity(this.employeeId);

      if (this.employee) {
        this.setEmployee(this.employee);
      } else {
        this.getEmployeeSubscription = this.employeesService.getEmployee(this.employeeId)
          .subscribe((data) => {
            this.employee = data;
            this.setEmployee(this.employee);
          });
      }
    }
  }

  private setEmployee(employee: Employee) {
    for (const key in employee) {
      if (key !== 'id') {
        this.newEmployee.get(key).setValue(employee[key]);
      }
    }
  }

  createEmployee() {
    this.createEmployeeSubscription = this.employeesService.createEmployee(this.newEmployee.value)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteUser() {
    this.deleteEmployeeSubscription = this.employeesService.deleteEmployee(this.employee.id)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateEmployee() {
    this.updateEmployeeSubscription = this.employeesService
    .updateEmployee(this.employee.id, this.newEmployee.value)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    if (this.deleteEmployeeSubscription) {
      this.deleteEmployeeSubscription.unsubscribe();
    }

    if (this.createEmployeeSubscription) {
      this.createEmployeeSubscription.unsubscribe();
    }

    if (this.updateEmployeeSubscription) {
      this.updateEmployeeSubscription.unsubscribe();
    }

    if (this.getEmployeeSubscription) {
      this.getEmployeeSubscription.unsubscribe();
    }
  }

}
