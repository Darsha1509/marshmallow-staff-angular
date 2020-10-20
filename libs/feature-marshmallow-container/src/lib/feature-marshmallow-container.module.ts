import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

import { MarshmallowRouterModule } from './marshmallow-routing.module';
import { FeatureEmployeeDetailsModule } from '@marshmallow-land/feature-employee-details';

@NgModule({
  imports: [CommonModule, MarshmallowRouterModule, FeatureEmployeeDetailsModule],
  declarations: [ContainerComponent],
  exports: [ContainerComponent],
})
export class FeatureMarshmallowContainerModule {}
