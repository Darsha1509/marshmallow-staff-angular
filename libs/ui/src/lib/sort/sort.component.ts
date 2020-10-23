import { Component, OnInit, Input, Output, forwardRef, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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
  @Output() sortMessage: EventEmitter<SortMessage> = new EventEmitter<SortMessage>();
  @Input() value: string;

  sortParams: SortMessage;
  asc: boolean;
  desc: boolean;

  private ngUnsubscribe = new Subject();

  onChange = (value: SortMessage) => {};

  constructor() {}

  ngOnInit(): void {
    this.sortParams = {
      sort: this.value,
    };

    this.asc = false;
    this.desc = false;
  }

  changeAscSortVal() {
    this.asc = !this.asc;
    if (this.asc) {
      this.sortParams.order = 'ASC';
    } else {
      delete this.sortParams.order;
    }

    this.writeValue(this.sortParams);
    this.onChange(this.sortParams);
  }

  changeDescSortVal() {
    this.desc = !this.desc;
  }

  writeValue(value: SortMessage) {
    console.log('write', value);
  }

  registerOnChange(callback: (change: any) => void) {
    this.onChange = callback;
  }

  registerOnTouched() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
