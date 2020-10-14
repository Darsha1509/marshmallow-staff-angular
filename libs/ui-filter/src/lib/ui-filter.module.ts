import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FilterComponent],
  exports: [FilterComponent],
})
export class UiFilterModule {}
