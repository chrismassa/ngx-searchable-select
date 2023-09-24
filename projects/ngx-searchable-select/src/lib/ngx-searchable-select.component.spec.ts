import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSearchableSelectComponent } from './ngx-searchable-select.component';

describe('NgxSearchableSelectComponent', () => {
  let component: NgxSearchableSelectComponent;
  let fixture: ComponentFixture<NgxSearchableSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxSearchableSelectComponent]
    });
    fixture = TestBed.createComponent(NgxSearchableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
