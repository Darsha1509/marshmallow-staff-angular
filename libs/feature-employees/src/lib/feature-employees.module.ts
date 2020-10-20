import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { AppRoutingModule } from './employees-routing.module';
import { UiFilterModule } from '@marshmallow-land/ui-filter';
import { UiSortModule } from '@marshmallow-land/ui-sort';
import { DataAccessEmployeesModule } from '@marshmallow-land/data-access-employees';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UiFilterModule,
    UiSortModule,
    DataAccessEmployeesModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent],
})
export class FeatureEmployeeDetailssModule {}
