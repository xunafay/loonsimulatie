import { Component, Inject, computed, input } from '@angular/core';
import { PayScale } from '../pay-scale.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { PAY_INDEX } from '../app.config';

registerLocaleData(localeNl);

@Component({
  selector: 'app-pay-breakdown',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pay-breakdown.component.html',
  styleUrl: './pay-breakdown.component.scss'
})
export class PayBreakdownComponent {
  scale = input.required<PayScale>();
  step = input.required<number>();

  salary = computed(() => this.scale().salary[this.step()]);
  indexedSalary = computed(() => this.salary() * this.payIndex);
  rsz = computed(() => this.indexedSalary() * 0.1307);
  withholding = computed(() => (this.indexedSalary() - this.rsz()) * 0.33);
  monthlyPay = computed(() => this.indexedSalary() / 12);

  constructor(
    @Inject(PAY_INDEX) private payIndex: number,
  ) {}
}
