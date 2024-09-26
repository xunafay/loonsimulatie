import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, afterNextRender, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayScaleService {
  private _scales: WritableSignal<PayScale[]> = signal([]);
  readonly scales: Signal<PayScale[]> = this._scales.asReadonly();

  constructor(private http: HttpClient) {
    this.getPayScales(); // pay scales are loaded on initialization once
  }

  getPayScales(): void {
    afterNextRender(() => {
      this.http.get('data.csv', {
        responseType: 'text' // prevent the default JSON parsing attempt
      }).subscribe(data => {
        this._scales.set(this.parseCSV(data));
      });
    });
  }

  /** Assumes csv data is in the format: name, scale, salary where scale is in ascending order
    *
    * @param data CSV document in string format
    * @returns PayScale[]
    */
  private parseCSV(data: string): PayScale[] {
    const rawRows = data.split('\n');
    rawRows.shift(); // remove the header
    const rows = rawRows.map(row => {
      const [name, scale, salary] = row.split(',');
      return { name, scale: parseInt(scale), salary: parseInt(salary) };
    });

    // group rows by name
    const scales: PayScale[] = [];
    for (const row of rows) {
      const scale = scales.find(s => s.name === row.name);
      if (scale) {
        scale.salary.push(row.salary);
      } else {
        scales.push({ name: row.name, salary: [row.salary] });
      }
    }

    return scales;
  }
}

export interface PayScale {
  name: string;
  salary: number[];
}
