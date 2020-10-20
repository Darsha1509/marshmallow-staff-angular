import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { EmployeesQuery, EmployeesService } from'@marshmallow-land/data-access-eployees';
import { Employee } from '@marshmallow-land/models';

@Component({
  selector: 'marshmallow-land-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  newEmployee: FormGroup;
  employeeId: number | null;
  employee: Employee;

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
        this.employeesService.getEmployee(this.employeeId).pipe(
          take(1),
        )
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
    this.employeesService.createEmployee(this.newEmployee.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deleteUser() {
    this.employeesService.deleteEmployee(this.employee.id).pipe(
      take(1),
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateEmployee() {
    this.employeesService.updateEmployee(this.employee.id, this.newEmployee.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
