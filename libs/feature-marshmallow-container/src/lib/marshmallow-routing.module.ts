import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from '@marshmallow-land/feature-employee-details';
import { EmployeesComponent } from '@marshmallow-land/feature-employees';

export const routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employees/new', component: EmployeeComponent },
  { path: 'employees/:employeeId', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MarshmallowRouterModule {}