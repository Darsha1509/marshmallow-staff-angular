import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Data {
  sort?: string;
  order?: string;
}

@Component({
  selector: 'marshmallow-land-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit, OnDestroy {
  @Output() ascValMessage: EventEmitter<Data> = new EventEmitter<Data>();
  @Output() descValMessage: EventEmitter<Data> = new EventEmitter<Data>();
  @Input() value: string;

  ascVal: FormControl;
  descVal: FormControl;
  sortData: Data;
  private ngUnsubscribe = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.ascVal = new FormControl(false);
    this.descVal = new FormControl(false);
    this.sortData = {
      sort: this.value,
      order: '',
    };

    this.ascVal.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe((data) => {
        if (data) {
          this.sortData.order = 'ASC';
          this.ascValMessage.emit(this.sortData);
        } else {
          this.ascValMessage.emit({});
        }
      });

    this.descVal.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe((data) => {
        if (data) {
          this.sortData.order = 'DESC';
          this.descValMessage.emit(this.sortData);
        } else {
          this.ascValMessage.emit({});
        }
      });
  }

  changeAscSortVal() {
    this.ascVal.setValue(!this.ascVal.value);
  }

  changeDescSortVal() {
    this.descVal.setValue(!this.descVal.value);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
