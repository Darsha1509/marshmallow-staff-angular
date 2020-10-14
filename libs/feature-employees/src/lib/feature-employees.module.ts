import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { AppRoutingModule } from './employees-routing.module';
import { UiFilterModule } from '@marshmallow-land/ui-filter';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule, UiFilterModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent]
})
export class FeatureEmployeesModule {}
