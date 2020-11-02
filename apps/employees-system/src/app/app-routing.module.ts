import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes = [
  {
    path: '',
    loadChildren: () => import('@marshmallow-land/marshmallow-employees-feature-shell')
      .then(m => m.MarshmallowEmployeesFeatureShellModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule { }
