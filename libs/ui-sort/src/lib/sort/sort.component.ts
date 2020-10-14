import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'marshmallow-land-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit, OnDestroy {
  @Output() ascValMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() descValMessage: EventEmitter<string> = new EventEmitter<string>();

  ascVal: FormControl;
  descVal: FormControl;

  ascSubscription: Subscription;
  descSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.ascVal = new FormControl(false);
    this.descVal = new FormControl(false);

    this.ascSubscription = this.ascVal.valueChanges.subscribe(data => this.ascValMessage.emit(data));
    this.descSubscription = this.descVal.valueChanges.subscribe(data => this.descValMessage.emit(data));
  }

  changeAscSortVal(){
    this.ascVal.setValue(!this.ascVal.value);
  }

  changeDescSortVal(){
    this.descVal.setValue(!this.descVal.value);
  }

  ngOnDestroy() {
    this.ascSubscription.unsubscribe();
    this.descSubscription.unsubscribe();
  }

}
