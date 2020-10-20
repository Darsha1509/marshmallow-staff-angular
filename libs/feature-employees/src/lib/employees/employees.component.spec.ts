import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeesComponent } from './employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiFilterModule } from '@marshmallow-land/ui-filter';
import { UiSortModule } from '@marshmallow-land/ui-sort';
import { EmployeesService, employees, Employee } from '@marshmallow-land/data-access-employees';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PaginationResponse } from '@datorama/akita';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let paginationResponse: PaginationResponse<Employee>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        ReactiveFormsModule,
        UiFilterModule,
        UiSortModule,
        RouterTestingModule],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            getPage: jest.fn(() => employees),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: '1' }),
          },
        },
        {
          provide: EmployeesService,
          useValue: {
            getPage: jest.fn(() => {
              return of(paginationResponse);
            }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    paginationResponse = {
      perPage: 10,
      lastPage: 2,
      currentPage: 1,
      total: 13,
      data: employees.slice(0, 10),
    };
    fixture = TestBed.createComponent(EmployeesComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('click on prev page from page 1', waitForAsync(() => {
    const prevPage = fixture.debugElement.nativeElement.querySelector('li.prev-page');
    prevPage.click();
    expect(component.queryParams.page).toBe('1');
  }));

  it('click on prev page from page 2', waitForAsync(() => {
    const pageTwo = fixture.debugElement.nativeElement.querySelector('li:nth-child(3)');
    pageTwo.click();
    expect(component.queryParams.page).toBe('2');
    const prevPage = fixture.debugElement.nativeElement.querySelector('li.prev-page');
    prevPage.click();
    expect(component.queryParams.page).toBe('1');
  }));

  it('click on next page from page 1', waitForAsync(() => {
    const nextPage = fixture.debugElement.nativeElement.querySelector('li.next-page');
    nextPage.click();
    expect(component.queryParams.page).toBe('2');
  }));

  it('click on next page from page 2', waitForAsync(() => {
    const pageTwo = fixture.debugElement.nativeElement.querySelector('li:nth-child(3)');
    pageTwo.click();
    expect(component.queryParams.page).toBe('2');
    const nextPage = fixture.debugElement.nativeElement.querySelector('li.next-page');
    nextPage.click();
    expect(component.queryParams.page).toBe('2');
  }));
});
