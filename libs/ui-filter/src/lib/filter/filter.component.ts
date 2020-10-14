import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'marshmallow-land-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Output() fromValMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() toValMessage: EventEmitter<string> = new EventEmitter<string>();

  fromValue: FormControl;
  toValue: FormControl;

  fromValueSubscription: Subscription;
  toValueSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.fromValue = new FormControl('');
    this.toValue = new FormControl('');

    this.fromValueSubscription = this.fromValue.valueChanges.pipe(
      debounceTime(500)
    )
     .subscribe(data => this.fromValMessage.emit(String(data)));

    this.toValueSubscription = this.toValue.valueChanges.pipe(
      debounceTime(500)
    )
     .subscribe(data => this.toValMessage.emit(String(data)));
  }

  ngOnDestroy() {
    this.fromValueSubscription.unsubscribe();
    this.toValueSubscription.unsubscribe();
  }

}
