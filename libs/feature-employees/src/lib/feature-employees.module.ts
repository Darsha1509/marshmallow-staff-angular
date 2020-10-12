import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent]
})
export class FeatureEmployeesModule {}
