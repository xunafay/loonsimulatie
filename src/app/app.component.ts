import { Component, computed, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { PayScale, PayScaleService } from './pay-scale.service';
import { PayBreakdownComponent } from './pay-breakdown/pay-breakdown.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSelectModule, PayBreakdownComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedScale = model<PayScale | undefined>(undefined);
  selectedStep = model<number | undefined>(0);

  scales = computed(() => this.payScaleService.scales());
  steps = computed(() => {
    const scale = this.scales().find(scale => scale.name == this.selectedScale()?.name);
    return scale ? Array.from(Array(scale.salary.length).keys()) : [];
  });

  information = computed(() => {
    const scale = this.selectedScale();
    if (!scale) return '';
    const trap = this.selectedStep();
    if (trap === undefined) return '';
    return `De ${scale.name} schaal, trap ${trap} heeft een salaris van €${(scale.salary[trap] / 12 / 100).toFixed(2)}`;
  });

  constructor(
    private payScaleService: PayScaleService
  ) {
  }
}
