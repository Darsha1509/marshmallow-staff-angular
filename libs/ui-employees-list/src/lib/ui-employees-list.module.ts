import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { UiModule } from '@marshmallow-land/ui';

@NgModule({
  imports: [CommonModule, UiModule],
  declarations: [EmployeesListComponent],
  exports: [EmployeesListComponent],
})
export class UiEmployeesListModule {}
