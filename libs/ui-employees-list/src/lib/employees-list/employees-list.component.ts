import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Employee } from '@marshmallow-land/models';

export interface EmployeesListData {
  sort?: string;
  order?: string;
  id?: number;
}

@Component({
  selector: 'marshmallow-land-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeesListComponent),
      multi: true,
    },
  ],
})
export class EmployeesListComponent implements OnInit, OnDestroy,  ControlValueAccessor{
  @Input() employees: Employee[];

  employeeListParams: FormControl;
  ngUnsubscribe = new Subject();

  onTouched = () => {};
  onChange = (value: EmployeesListData): void => {};

  constructor() { }

  ngOnInit(): void {
    this.employeeListParams = new FormControl(null);
  }

  setSortMessage(data: EmployeesListData) {
    this.employeeListParams.setValue(data);
  }

  sendEmployeeId(id: number) {
    this.employeeListParams.setValue({ id });
  }

  registerOnChange(onChange: (value: EmployeesListData) => void) {
    this.employeeListParams.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe(onChange);
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue() {}

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
