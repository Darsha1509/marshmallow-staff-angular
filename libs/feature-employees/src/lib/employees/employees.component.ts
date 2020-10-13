import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
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

  constructor(
    private employeesService: EmployeesService,
    @Inject(EMPLOYEES_PAGINATOR) public paginatorRef: PaginatorPlugin<EmployeesState>,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.searchParam = new FormControl('');

    this.pagination$ = this.route.queryParams.pipe(
      startWith({page: '1'}),
      filter(params => Object.keys(params).length >= 1),
      tap(data => console.log(data)),
      switchMap((queryData: { page: string; search: string }) => {
        const requestFn = () => this.employeesService.getPage(queryData.page, queryData.search);
        console.log('here');
        return this.paginatorRef.getPage(requestFn);
      })
    );
  }

  prevPage() {    
    const { currentPage } = this.paginatorRef;
    if(currentPage >= 2) {
      this.router.navigate([], { queryParams: { page: currentPage - 1 } });
      this.paginatorRef.setPage(currentPage - 1);
    }
    
  }

  setPage(page: number) {
    this.router.navigate([], { queryParams: { page } });
    this.paginatorRef.setPage(page);
  }

  nextPage() {
    const { currentPage } = this.paginatorRef;
    if (!this.paginatorRef.isLast) {
      this.router.navigate([], { queryParams: { page: currentPage + 1 } });
      this.paginatorRef.setPage(currentPage + 1);
    }
  }

  ngOnDestroy() {
    this.paginatorRef.destroy();
  }

}
