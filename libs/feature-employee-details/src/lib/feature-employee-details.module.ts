import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsRoutingModule } from './feature-employee-details-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EmployeeDetailsRoutingModule],
  declarations: [EmployeeComponent],
  exports: [EmployeeComponent],
})
export class FeatureEmployeeDetailsModule {}
