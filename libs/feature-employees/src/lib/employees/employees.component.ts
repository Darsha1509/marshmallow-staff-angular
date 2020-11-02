import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { switchMap, debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeesService, EmployeesState } from '@marshmallow-land/data-access-employees';
import { Employee } from '@marshmallow-land/models';
import { EmployeesListData } from '@marshmallow-land/ui-employees-list';
import { EMPLOYEES_PAGINATOR } from '../employees-paginator';

@Component({
  selector: 'marshmallow-land-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
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
    sort?: string;
    order?: string;
  };
  filterData: FormGroup;
  employeesTableData: FormControl;
  private ngUnsubscribe = new Subject();

  constructor(
    private employeesService: EmployeesService,
    @Inject(EMPLOYEES_PAGINATOR) public paginatorRef: PaginatorPlugin<EmployeesState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchParam = new FormControl('');
    this.filterData = new FormGroup({
      salary: new FormControl({}),
      hours: new FormControl({}),
    });
    this.employeesTableData = new FormControl();
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
        sort?: string;
        order?: string;
      }) => {
        function requestFn() {
          return this.employeesService.getPage(queryData);
        }
        const newFunc  = requestFn.bind(this);

        return this.paginatorRef.getPage(newFunc);
      }),
    );

    this.searchParam.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.ngUnsubscribe),
    ).subscribe((data) => {
      this.paginatorRef.clearPage(1);

      if (data) {
        this.queryParams.search = data;
      } else {
        delete this.queryParams.search;
      }

      this.router.navigate([], { queryParams: this.queryParams });
    });

    this.filterData.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((data) => {
      if (data.salary.from || data.salary.from === '') {
        this.setFilterData('minSalary', data.salary.from);
      }

      if (data.salary.to || data.salary.to === '') {
        this.setFilterData('maxSalary', data.salary.to);
      }

      if (data.hours.from || data.hours.from === '')  {
        this.setFilterData('minHours', data.hours.from);
      }

      if (data.hours.to || data.hours.to === '') {
        this.setFilterData('maxHours', data.hours.to);
      }
    });

    this.employeesTableData.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((data: EmployeesListData) => {
      if (data.sort) {
        this.paginatorRef.clearPage(1);
        this.queryParams.sort = data.sort;
        this.queryParams.order = data.order;
        this.router.navigate([], { queryParams: this.queryParams });
      } else {
        this.paginatorRef.clearPage(1);
        delete this.queryParams.sort;
        delete this.queryParams.order;
        this.router.navigate([], { queryParams: this.queryParams });
      }

      if (data.id) {
        this.router.navigate([`employees/${data.id}`], {});
      }
    });
  }

  prevPage() {
    const { currentPage } = this.paginatorRef;
    if (currentPage >= 2) {
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

  private setFilterData(filterParam: string, value: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams[filterParam] = value;

    if (!value) {
      delete this.queryParams[filterParam];
    }

    this.router.navigate([], { queryParams: this.queryParams });
    this.paginatorRef.setPage(1);
  }

  ngOnDestroy() {
    this.paginatorRef.clearPage(1);
    this.paginatorRef.destroy();
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
