import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, merge, Subject } from 'rxjs';
import { startWith, switchMap, tap, map, delay, take, takeLast, filter } from 'rxjs/operators';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { ActivatedRoute, Router } from '@angular/router';


import { Employee } from '@marshmallow-land/data-access-eployees';
import { EmployeesService } from '@marshmallow-land/data-access-eployees';
import { EMPLOYEES_PAGINATOR } from '@marshmallow-land/data-access-eployees';
import { EmployeesState } from '@marshmallow-land/data-access-eployees';

@Component({
  selector: 'marshmallow-land-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  searchParam: FormControl;
  pagination$: Observable<PaginationResponse<Employee>>;
  queryParams: {
    page?: string; 
    search?: string;
    minSalary?: string;
    maxSalary?: string;
    minHours?: string;
    maxHours?: string;
  }

  constructor(
    private employeesService: EmployeesService,
    @Inject(EMPLOYEES_PAGINATOR) public paginatorRef: PaginatorPlugin<EmployeesState>,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.searchParam = new FormControl('');
    this.queryParams = { page: '1' };

    this.router.navigate([], { queryParams: this.queryParams });

    this.pagination$ = this.route.queryParams.pipe(
      filter(params => Object.keys(params).length >= 1),
      switchMap((queryData: { 
        page?: string; 
        search?: string;
        minSalary?: string;
        maxSalary?: string;
        minHours?: string;
        maxHours?: string;
      }) => {
        function requestFn() {
          return this.employeesService.getPage(queryData);
        };
        const newFunc  = requestFn.bind(this);
        
        return this.paginatorRef.getPage(newFunc);
      })
    );
  }

  prevPage() {    
    const { currentPage } = this.paginatorRef;
    if(currentPage >= 2) {
      this.queryParams.page = String(currentPage - 1);
      this.router.navigate([], { queryParams: this.queryParams });
      this.paginatorRef.setPage(currentPage - 1);
    }
    
  }

  setPage(page: number) {
    this.queryParams.page = String(page);
    this.router.navigate([], { queryParams: this.queryParams });
    this.paginatorRef.setPage(page);
  }

  nextPage() {
    const { currentPage } = this.paginatorRef;
    if (!this.paginatorRef.isLast) {
      this.queryParams.page = String(currentPage + 1);
      this.router.navigate([], { queryParams: this.queryParams });
      this.paginatorRef.setPage(currentPage + 1);
    }
  }

  setMinSalary(salary: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams.minSalary = salary;

    if(!salary) {
      delete this.queryParams.minSalary;      
    }

    this.router.navigate([], { queryParams: this.queryParams });
    this.paginatorRef.setPage(1); 
  }

  setMaxSalary(salary: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams.maxSalary = salary;

    if(!salary) {
      delete this.queryParams.maxSalary;
    }

    this.router.navigate([], { queryParams: this.queryParams });
  }

  setMinHours(hours: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams.minHours = hours;

    if(!hours) {
      delete this.queryParams.minHours;      
    }

    this.router.navigate([], { queryParams: this.queryParams });
  }

  setMaxHours(hours: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams.maxHours = hours;

    if(!hours) {
      delete this.queryParams.maxHours;      
    }

    this.router.navigate([], { queryParams: this.queryParams });
  }

  ngOnDestroy() {
    this.paginatorRef.destroy();
    this.router.navigate([], { queryParams: { } });
  }

}
