import { Component, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  normalizedUrl = '';
  constructor() {
    afterNextRender(() => {
      const language = window.location.pathname.split('/')[1];
      if (language === 'de' || language === 'fr' || language === 'en') {
        this.normalizedUrl = window.location.pathname.replace(`/${language}`, '');
      } else {
        this.normalizedUrl = `${window.location.pathname}${window.location.search}`;
      }
    });
  }

  languagePrepend(language: string): string {

    if (language == 'nl') {
      return this.normalizedUrl;
    }

    return `/${language}${this.normalizedUrl}`;
  }
}
