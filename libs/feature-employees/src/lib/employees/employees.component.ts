import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { switchMap, debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeesService, EMPLOYEES_PAGINATOR, EmployeesState } from '@marshmallow-land/data-access-eployees';
import { Employee } from '@marshmallow-land/models';

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
  searchSubscription: Subscription;
  private ngUnsubscribe = new Subject();

  constructor(
    private employeesService: EmployeesService,
    @Inject(EMPLOYEES_PAGINATOR) public paginatorRef: PaginatorPlugin<EmployeesState>,
    private route: ActivatedRoute,
    private router: Router,
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
        }
        const newFunc  = requestFn.bind(this);

        return this.paginatorRef.getPage(newFunc);
      }),
    );

    this.searchSubscription = this.searchParam.valueChanges.pipe(
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
    console.log(currentPage);
    if (!this.paginatorRef.isLast) {
      this.queryParams.page = String(currentPage + 1);
      this.router.navigate([], { queryParams: this.queryParams });
      this.paginatorRef.setPage(currentPage + 1);
    }
  }

  // filtering methods
  setMinSalary(salary: string) {
    this.setFiterData('minSalary', salary);
  }

  setMaxSalary(salary: string) {
    this.setFiterData('maxSalary', salary);
  }

  setMinHours(hours: string) {
    this.setFiterData('minHours', hours);
  }

  setMaxHours(hours: string) {
    this.setFiterData('maxHours', hours);
  }

  private setFiterData(filterParam: string, value: string) {
    this.paginatorRef.clearPage(1);

    this.queryParams[filterParam] = value;

    if (!value) {
      delete this.queryParams[filterParam];
    }

    this.router.navigate([], { queryParams: this.queryParams });
    this.paginatorRef.setPage(1);
  }

  // sorting methods
  sortRoomAsc(sortVal: boolean) {
    this.setSortParam('room', 'ASC', sortVal);
  }

  sortRoomDesc(sortVal: boolean) {
    this.setSortParam('room', 'DESC', sortVal);
  }

  sortSurnameAsc(sortVal: boolean) {
    this.setSortParam('surname', 'ASC', sortVal);
  }

  sortSurnameDesc(sortVal: boolean) {
    this.setSortParam('surname', 'DESC', sortVal);
  }

  sortPatronymicAsc(sortVal: boolean) {
    this.setSortParam('patronymic', 'ASC', sortVal);
  }

  sortPatronymicDesc(sortVal: boolean) {
    this.setSortParam('patronymic', 'DESC', sortVal);
  }

  sortEmailAsc(sortVal: boolean) {
    this.setSortParam('email', 'ASC', sortVal);
  }

  sortEmailDesc(sortVal: boolean) {
    this.setSortParam('email', 'DESC', sortVal);
  }

  private setSortParam(param: string, order: string, sortVal: boolean) {
    this.paginatorRef.clearPage(1);

    if (sortVal) {
      this.queryParams.sort = param;
      this.queryParams.order = order;
    } else {
      delete this.queryParams.sort;
      delete this.queryParams.order;
    }

    this.router.navigate([], { queryParams: this.queryParams });
  }

  redirectToEmployee(id: number) {
    this.router.navigate([`/employees/${id}`]);
  }

  ngOnDestroy() {
    this.paginatorRef.clearPage(1);
    this.paginatorRef.destroy();
    this.router.navigate([], { queryParams: { } });
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
