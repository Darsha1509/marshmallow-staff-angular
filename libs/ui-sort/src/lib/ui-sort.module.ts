import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort/sort.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [SortComponent],
  exports: [SortComponent],
})
export class UiSortModule {}
