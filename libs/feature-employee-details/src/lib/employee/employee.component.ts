import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter, switchMap, tap } from 'rxjs/operators';

import { EmployeesQuery, EmployeesService } from'@marshmallow-land/data-access-employees';
import { Employee } from '@marshmallow-land/models';

@Component({
  selector: 'marshmallow-land-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  newEmployee: FormGroup;
  employeeId: number | string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private employeesQuery: EmployeesQuery,
    private employeesService: EmployeesService,
  ) {}

  ngOnInit(): void {
    this.newEmployee = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      salary: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      room: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      hours: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      email: new FormControl('', Validators.required),
    });

    this.employeeId = this.activatedRouter.snapshot.params['employeeId'];

    this.activatedRouter.data.pipe(
      take(1),
      filter((data: { isDataInState : boolean }) => data.isDataInState),
      switchMap(() => this.employeesQuery.selectEntity(this.employeeId).pipe(take(1))),
    ).subscribe(employee => this.setEmployee(employee));
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
    this.employeesService.deleteEmployee(+this.employeeId).pipe(
      take(1),
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  updateEmployee() {
    this.employeesService.updateEmployee(+this.employeeId, this.newEmployee.value).pipe(
      take(1),
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
