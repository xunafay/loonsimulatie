import { TestBed } from '@angular/core/testing';

import { PayScaleService } from './pay-scale.service';

describe('PayScaleService', () => {
  let service: PayScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
