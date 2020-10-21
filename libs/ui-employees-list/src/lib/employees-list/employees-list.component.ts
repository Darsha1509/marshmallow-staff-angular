import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
})
export class EmployeesListComponent implements OnInit {
  @Input() employees: Employee[];
  @Output() employeeListMessage: EventEmitter<EmployeesListData>
    = new EventEmitter<EmployeesListData>();

  constructor() { }

  ngOnInit(): void {
  }

  sendMessageToParent(data: EmployeesListData) {
    this.employeeListMessage.emit(data);
  }

  sendEmployeeId(id: number) {
    this.employeeListMessage.emit({ id });
  }
}
