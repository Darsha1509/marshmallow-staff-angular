import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

interface FilterValue {
  from: number | null;
  to: number | null;
}

@Component({
  selector: 'marshmallow-land-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string;

  filterData: FormGroup;

  private ngUnsubscribe =  new Subject();

  constructor() { }

  ngOnInit(): void {
    this.filterData = new FormGroup({
      from: new FormControl(null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      to: new FormControl(null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    });
  }

  writeValue(value: FilterValue) {

  }

  registerOnChange(fn: (value: any) => void) {
    this.filterData.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500),
    ).subscribe(fn);
  }

  registerOnTouched() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
