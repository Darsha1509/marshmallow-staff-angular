import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { UiModule } from '@marshmallow-land/ui';

@NgModule({
  imports: [CommonModule, UiModule, ReactiveFormsModule],
  declarations: [EmployeesListComponent],
  exports: [EmployeesListComponent],
})
export class UiEmployeesListModule {}
