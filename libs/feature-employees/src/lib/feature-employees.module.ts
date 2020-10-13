import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { AppRoutingModule } from './employees-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent]
})
export class FeatureEmployeesModule {}
