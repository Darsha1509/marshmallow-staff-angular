import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { UiModule } from '@marshmallow-land/ui';
import { DataAccessEmployeesModule } from '@marshmallow-land/data-access-employees';
import { UiEmployeesListModule } from '@marshmallow-land/ui-employees-list';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    UiModule,
    DataAccessEmployeesModule,
    UiEmployeesListModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent],
})
export class FeatureEmployeesModule {}
