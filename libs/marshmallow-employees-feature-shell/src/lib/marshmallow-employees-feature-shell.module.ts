import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

import { MarshmallowRouterModule } from './marshmallow-routing.module';
import { EmployeeResolver } from './employee.resolver';

@NgModule({
  imports: [CommonModule, MarshmallowRouterModule],
  declarations: [ContainerComponent],
  exports: [ContainerComponent],
  providers: [EmployeeResolver],
})
export class MarshmallowEmployeesFeatureShellModule {}
