import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from '@marshmallow-land/feature-employee-details';
import { EmployeesComponent } from '@marshmallow-land/feature-employees';

export const routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employees/:employeeId', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarshmallowRouterModule {}
