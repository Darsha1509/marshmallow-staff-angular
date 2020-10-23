import { Component, OnInit, Input, Output, forwardRef, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

interface SortMessage {
  sort?: string;
  order?: string;
}

@Component({
  selector: 'marshmallow-land-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortComponent),
      multi: true,
    },
  ],
})
export class SortComponent implements OnInit, OnDestroy,  ControlValueAccessor {
  @Input() value: string;

  sortParams: FormGroup;
  asc: boolean;
  desc: boolean;

  private ngUnsubscribe = new Subject();

  private onTouched = () => {};
  private onChange = (value: SortMessage): void => {};

  constructor() {}

  ngOnInit(): void {
    this.asc = false;
    this.desc = false;

    this.sortParams = new FormGroup({
      sort: new FormControl(this.value),
      order: new FormControl(''),
    });
  }

  changeAscSortVal() {
    this.asc = !this.asc;
    if (this.asc) {
      this.sortParams.get('order').setValue('ASC');
    } else {
      this.sortParams.get('order').setValue('');
    }
  }

  changeDescSortVal() {
    this.desc = !this.desc;
    if (this.desc) {
      this.sortParams.get('order').setValue('DESC');
    } else {
      this.sortParams.get('order').setValue('');
    }
  }

  writeValue(value: SortMessage) {}

  registerOnChange(onChange: (value: string) => void) {
    this.sortParams.valueChanges.pipe(
      map(data => data.order === '' ? {} : data),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(onChange);
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
