import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }
  
  private initLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.languageSubject.next(lang);
  }

  getCurrentLanguage() {
    return this.languageSubject.asObservable();
  }

  getTranslation(key: string | string[], interpolateParams?: Object) {
    return this.translate.instant(key, interpolateParams);
  }
}