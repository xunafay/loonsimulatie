import { ApplicationConfig, DEFAULT_CURRENCY_CODE, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

/**
 * Injection token for the pay index.
 * This should preferably be from an api irl but for the sake of this example it's a global constant.
 */
export const PAY_INDEX = new InjectionToken<number>('PAY_INDEX');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {provide: PAY_INDEX, useValue: 2.0807}
  ]
};
