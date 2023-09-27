import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Optional, Self, ViewEncapsulation } from '@angular/core';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, startWith } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

type StringOrRecord = string | Record<string, any>;

@Component({
  selector: 'ngx-searchable-select',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <mat-form-field class="search-select" [appearance]="appearance">
      <mat-spinner
        *ngIf="!options"
        matPrefix
        [diameter]="25"
        class="loading"
        matTooltip="Loading data..."
      ></mat-spinner>
      <mat-label>{{ label }}</mat-label>
      <mat-select
        disableRipple
        (selectionChange)="onSelectionChange($event)"
        [formControl]="_value"
      >
        <mat-option class="search">
          <mat-form-field
            (click)="$event.stopPropagation()"
            [appearance]="appearance"
          >
            <input
              matInput
              placeholder="Search {{ label }}..."
              [formControl]="searchText"
              (keydown)="$event.stopPropagation()"
            />
            <button
              color="primary"
              mat-icon-button
              matSuffix
              (click)="$event.stopPropagation(); searchText.reset()"
            >
              <mat-icon>clear</mat-icon>
            </button>
          </mat-form-field>
        </mat-option>
        <div class="options-box">
          <mat-option
            *ngFor="let option of filteredOptions$ | async"
            [value]="option"
            >{{ getName(option) }}</mat-option
          >
          <span
            *ngIf="(filteredOptions$ | async)?.length === 0"
            class="no-option"
            >{{ nothingFoundText }}</span
          >
        </div>
      </mat-select>
      <mat-error>Invalid field</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./ngx-searchable-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxSearchableSelectComponent<T extends StringOrRecord> implements OnInit, ControlValueAccessor, OnChanges {

  @Input({ required: true }) label = '';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() options: T[] | null = null;
  @Input() searchField: string | null = null;
  @Input() nothingFoundText: string = 'Nothing found...';

  filter(text: string) {
    if (this.options) {
      const isStringArray = this.options.every((item) => typeof item === 'string');
      if (!isStringArray) {
        if (this.searchField) {
          const index = this.searchField;
          return this.options.filter(option => (<Record<string, any>>option)[index].toLowerCase().includes(text.toLowerCase()));
        }
        throw new Error('The options provided are not primitive strings. You must also provide the "searchField" input.');
      }
      return this.options.filter(option => (<string>option).toLowerCase().includes(text.toLowerCase()));
    }
    return [];
  };

  _value = new FormControl<T | null>(null, { nonNullable: false });
  public get value(): T | null {
    return this._value.value;
  }
  public set value(value: T | null) {
    this._value.setValue(value);
    this.onChange(value);
    this.onTouch(value);
  }

  onChange: any = () => { }
  onTouch: any = () => { }

  searchText = new FormControl('', { nonNullable: true });
  filteredOptions$ = this.searchText.valueChanges.pipe(
    startWith(''),
    map(text => this.filter(text))
  );

  constructor(@Self() @Optional() private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    const validators = this.ngControl.control?.validator;
    this._value.setValidators(validators ? validators : null);
    this._value.updateValueAndValidity();
  }

  ngOnChanges(): void {
    // Manually trigger options update 
    // Usefull in case of asynchronous options that have network latency
    this.searchText.reset();
  }

  writeValue(value: T | null): void {
    this._value.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this._value.disable() : this._value.enable();
  }

  onSelectionChange(event: MatSelectChange) {
    const value = <T>event.value;
    this.value = value;
  }

  getName(option: T) {
    return typeof (option) !== "string" && this.searchField ? option[this.searchField] : option;
  }

}
