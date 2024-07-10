import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.page.html',
  styleUrls: ['./select-language.page.scss'],
})
export class SelectLanguagePage implements OnInit {

  constructor(private languageService:LanguageService) { }

  ngOnInit() {
  }
  switchLanguage(lang: string) {
    console.log("lang",lang);
    
    this.languageService.setLanguage(lang);
  }
}
