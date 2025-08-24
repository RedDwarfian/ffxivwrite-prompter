import { TestBed } from '@angular/core/testing';

import { SpinOptionsService } from './spin-options.service';

describe('SpinOptionsService', () => {
  let service: SpinOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
