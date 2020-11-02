import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeResolver } from './employee.resolver';
import { ContainerComponent } from './container/container.component';

export const routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'employees',
        loadChildren: () => import('@marshmallow-land/feature-employees')
          .then(m => m.FeatureEmployeesModule),
      },
      {
        path: 'employees/:employeeId',
        loadChildren: () => import('@marshmallow-land/feature-employee-details')
          .then(m => m.FeatureEmployeeDetailsModule),
        resolve: {
          isDataInState: EmployeeResolver,
        },
      },
      { path: '',
        redirectTo: '/employees',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarshmallowRouterModule {}
