import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from '@marshmallow-land/feature-employee';
import { EmployeesComponent } from '@marshmallow-land/feature-employees';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: EmployeesComponent},
    {path: 'employees/new', component: EmployeeComponent},
    {path: 'employees/:employeeId', component: EmployeeComponent}
  ])],
  exports: [RouterModule]
})
export class MarshmallowRouterModule {}