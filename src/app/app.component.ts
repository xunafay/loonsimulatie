import { Component, computed, effect, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { PayScale, PayScaleService } from './pay-scale.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedCategory = model<string | undefined>(undefined);
  selectedScale = model<PayScale | undefined>(undefined);
  selectedTrap = model<number | undefined>(undefined);

  categories = computed(() => this.payScaleService.categories());
  scales = computed(() => {
    const scales = this.payScaleService.scales();
    return this.selectedCategory() ? scales.filter(scale => scale.name.startsWith(this.selectedCategory()!)) : scales;
  });
  trappen = computed(() => {
    let scale = this.scales().find(scale => scale.name == this.selectedScale()?.name);
    return scale ? Array.from(Array(scale.salary.length).keys()) : [];
  });

  information = computed(() => {
    const scale = this.selectedScale();
    if (!scale) return '';
    const trap = this.selectedTrap();
    if (trap === undefined) return '';
    return `De ${scale.name} schaal, trap ${trap} heeft een salaris van €${(scale.salary[trap] / 12 / 100).toFixed(2)}`;
  });

  constructor(
    private payScaleService: PayScaleService
  ) {
    effect(() => {
      console.log('trappen:', this.trappen());
      console.log('selectedScale:', this.selectedScale());
      console.log('scales:', this.scales());
      console.log('selectedTrap:', this.selectedTrap());
    });
  }
}
