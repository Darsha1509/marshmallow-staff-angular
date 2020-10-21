import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FilterComponent, SortComponent],
  exports: [FilterComponent, SortComponent],
})
export class UiModule {}
