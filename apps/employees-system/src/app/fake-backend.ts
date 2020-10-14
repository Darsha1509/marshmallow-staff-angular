import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Employee, PER_PAGE } from '@marshmallow-land/data-access-eployees';

let employees: Employee[] = [
  {
    id: 1,
    name: 'Darya',
    surname: 'Kokorina',
    patronymic: 'Vladimirovna',
    salary: 100,
    room: 301,
    hours: 20,
    email: 'darya.kakoryna@marshmallow.com'
  },
  {
    id: 2,
    name: 'Diana',
    surname: 'Kashrina',
    patronymic: 'Vladimirovna',
    salary: 200,
    room: 302,
    hours: 26,
    email: 'diana.kashrina@marshmallow.com'
  },
  {
    id: 3,
    name: 'Dmirty',
    surname: 'Barodzich',
    patronymic: 'Vitalievich',
    salary: 50,
    room: 303,
    hours: 40,
    email: 'dmitry.barodzich@marshmallow.com'
  },
  {
    id: 4,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 5,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 6,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 7,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 8,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 9,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 10,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 11,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 12,
    name: 'Maskim',
    surname: 'Smel\'',
    patronymic: 'Dmitrievich',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'maksim.smel@marshmallow.com'
  },
  {
    id: 13,
    name: 'Alice',
    surname: 'Smel\'',
    patronymic: 'Dmitrievna',
    salary: 500,
    room: 304,
    hours: 50,
    email: 'alice.smel@marshmallow.com'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body, params} = request;
    const searchParams = params.get('search');
    const pageParams = params.get('page');
    const minSalaryParams = params.get('minSalary');
    const maxSalaryParams = params.get('maxSalary');
    const minHoursParams = params.get('minHours');
    const maxHoursParams = params.get('maxHours');
    const sortParams = params.get('sort');

    // wrap in delayes observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch(true) {
        case url.match(/\/employees/) && method === "GET":          
          return getEmployeesPage();
        case url.endsWith("/employees") && method === "POST":
          return createEmployee();
        case url.match(/\/employees\/\d+$/) && method === "DELETE":
          return deleteEmployee();
        case url.match(/\/employees\/\d+$/) && method === "PATCH":
          return updateEmployee();
        case url.match(/\/employees\/\d+$/) && method === "GET":
          return getEmployee();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getEmployeesPage() {      
      if (pageParams) {
        sortData('name', 'ASC', employees);

        let result: Employee[] = employees;
        
        // filtering employees by different params
        if(minSalaryParams) {
          result = extractEmployees('salary', +minSalaryParams, 'min', result);
        }

        if(maxSalaryParams) {
          result = extractEmployees('salary', +maxSalaryParams, 'max', result);
        }

        if(minHoursParams) {
          result = extractEmployees('hours', +minHoursParams, 'min', result);
        }

        if(maxHoursParams) {
          result = extractEmployees('hours', +maxHoursParams, 'max', result);
        }

        // sort data
        if(sortParams) {
          const order = params.get('order');

          sortData(sortParams, order, result);       
        }

        // extract employees page
        const employeesPage: Employee[] = [];

        const lastEmployee = +pageParams * PER_PAGE - 1;
        const firstEmloyee = lastEmployee - PER_PAGE + 1;

        for(let i = firstEmloyee; i <= lastEmployee; i++) {
          if(i < result.length) {
            employeesPage.push(result[i]);
          }          
        }        

        return ok({ data: employeesPage, count: result.length });
      }      

      const withSearch = employees.filter(item => {
        return item.name.indexOf(searchParams[0]) > -1
        || item.surname.indexOf(searchParams[0]) > -1
        || item.patronymic.indexOf(searchParams[0]) > -1
        || item.email.indexOf(searchParams[0]) > -1
        || item.room === +searchParams[0]
      });
      return ok({ data: [...withSearch] });
    }

    function createEmployee() {
      const employee = body;
      const id = new Date().getTime();
      employees = [{...employee, id}, ...employees];
      return ok({ data: { id } });
    }

    function deleteEmployee() {
      employees = employees.filter((employee: Employee) => employee.id !== idFromUrl());
      return ok();
    }

    function updateEmployee() {
      const id = idFromUrl();
      const updates = body;
      employees = employees.map((employee: Employee) => {
        if(employee.id === id) {
          return { ...employee, ...updates }
        }
        return { ...employee }
      });
      return ok({ data: { id } });
    }

    function getEmployee() {
      const employee = employees.find(item => item.id === idFromUrl());
      return ok({
        data: !!employee ? { ...employee } : null
      });
    }

    //helper functions 

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return +urlParts[urlParts.length - 1];
    }

    // universal func for filtering data
    function extractEmployees(param: string, value: number, borderType: string, users: Employee[]) {
      return users.filter(employee => {
        if(borderType === 'min') {
          return employee[param] >= value;
        } else {
          return employee[param] <= value;
        }
      })
    }

    // universal func for sorting data
    function sortData(param: string, order: string, sortingData: Employee[]) {
      // get value of sorting data
      function getSortParam(object: Employee, paramName: string): string | number {
        let sortParam: string | number;

        if(typeof object[paramName] === 'string') {
          sortParam = object[paramName].toLowerCase();
        } else {
          sortParam = object[paramName];
        }

        return sortParam;
      }

      if(order === 'ASC') {
        sortingData.sort(function(a: Employee, b: Employee) {
          const sortParamA = getSortParam(a, param);
          const sortParamB = getSortParam(b, param);          

          if(sortParamA < sortParamB) {
            return -1;
          }

          if(sortParamA > sortParamB) {
            return 1;
          }

          return 0;
        });
      } else {
        sortingData.sort(function(a: Employee, b: Employee) {
          const sortParamA = getSortParam(a, param);
          const sortParamB = getSortParam(b, param); 

          if(sortParamA > sortParamB) {
            return -1;
          }

          if(sortParamA < sortParamB) {
            return 1;
          }

          return 0;
        })
      } 
    }
  }


}

