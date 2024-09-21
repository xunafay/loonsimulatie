import { TestBed } from '@angular/core/testing';

import { PayScaleService } from './pay-scale.service';
import { provideHttpClient } from '@angular/common/http';

describe('PayScaleService', () => {
  let service: PayScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(PayScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
