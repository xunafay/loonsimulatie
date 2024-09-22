import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBreakdownComponent } from './pay-breakdown.component';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { PAY_INDEX } from '../app.config';
import { PayScale } from '../pay-scale.service';
import { formatCurrency } from '@angular/common';

describe('PayBreakdownComponent', () => {
  let component: PayBreakdownComponent;
  let fixture: ComponentFixture<PayBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayBreakdownComponent],
      providers: [
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
        {provide: LOCALE_ID, useValue: 'nl-BE'},
        {provide: PAY_INDEX, useValue: 2.0807}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayBreakdownComponent);
    component = fixture.componentInstance;
    const ref = fixture.componentRef;
    ref.setInput('scale', {
      name: 'A111',
      salary: [
        2278000, 2353000, 2428000,
        2498000, 2498000, 2498000,
        2653000, 2653000, 2653000,
        2803000, 2803000, 2803000,
        2953000, 2953000, 2953000,
        3098000, 3098000, 3098000,
        3253000, 3253000, 3253000,
        3378000, 3378000, 3378000,
        3503000
      ]
    } as PayScale);
    ref.setInput('step', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the salary', () => {
    expect(component.monthlyPay()).toBeCloseTo(394986.22);
  });

  it('should display formatted values', () => {
    expect(fixture.nativeElement.querySelector('#monthly').textContent).toBe(formatCurrency(394986/100, 'nl-BE', '€'));
  });

  it('should update the values when the step changes', () => {
    const ref = fixture.componentRef;
    ref.setInput('step', 1);
    fixture.detectChanges();
    expect(component.monthlyPay()).toBeCloseTo(407990.591);
    expect(fixture.nativeElement.querySelector('#monthly').textContent).toBe(formatCurrency(407990.591/100, 'nl-BE', '€'));
  });
});
