import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeResolver } from './employee.resolver';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [EmployeeComponent],
  exports: [EmployeeComponent],
  providers: [EmployeeResolver],
})
export class FeatureEmployeeDetailsModule {}
