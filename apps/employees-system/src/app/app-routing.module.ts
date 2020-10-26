import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContainerComponent } from '@marshmallow-land/marshmallow-employees-feature-shell';

export const routes = [
  { path: '', component: ContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule { }
