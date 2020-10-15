import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

import { MarshmallowRouterModule } from './marshmallow-routing.module';
import { FeatureEmployeesModule } from '@marshmallow-land/feature-employees';
import { FeatureEmployeeModule } from '@marshmallow-land/feature-employee';

@NgModule({
  imports: [CommonModule, MarshmallowRouterModule, FeatureEmployeesModule, FeatureEmployeeModule],
  declarations: [ContainerComponent],
  exports: [ContainerComponent],
})
export class FeatureMarshmallowContainerModule {}
