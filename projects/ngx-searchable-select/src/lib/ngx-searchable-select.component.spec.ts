import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSearchableSelectComponent } from './ngx-searchable-select.component';

describe('NgxSearchableSelectComponent', () => {
  let component: NgxSearchableSelectComponent<string>;
  let fixture: ComponentFixture<NgxSearchableSelectComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxSearchableSelectComponent]
    });
    fixture = TestBed.createComponent(NgxSearchableSelectComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
