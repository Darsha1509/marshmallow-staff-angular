import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


import { Employee } from '@marshmallow-land/data-access-eployees';
import { EmployeesApiService } from '@marshmallow-land/data-access-eployees';

@Component({
  selector: 'marshmallow-land-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  searchParam: FormControl;
  employees$: Observable<Employee[]>;

  constructor(private emloyeesApiService: EmployeesApiService) { }

  ngOnInit(): void {
    this.searchParam = new FormControl('');

    this.employees$ = this.emloyeesApiService.getEmployees();
  }

}
