import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent, EmployeeResolver } from '@marshmallow-land/feature-employee-details';
import { EmployeesComponent } from '@marshmallow-land/feature-employees';

export const routes = [
  { path: '', component: EmployeesComponent },
  {
    path: 'employees/:employeeId',
    component: EmployeeComponent,
    resolve: {
      isDataInState: EmployeeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarshmallowRouterModule {}
