import { TestBed } from '@angular/core/testing';

import { NgxSearchableSelectService } from './ngx-searchable-select.service';

describe('NgxSearchableSelectService', () => {
  let service: NgxSearchableSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSearchableSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
