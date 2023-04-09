import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslationService} from './@shared/i18n';
// language list
import {locale as enLang} from './@shared/i18n/vocabs/en';
import {locale as arLang} from './@shared/i18n/vocabs/ar';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      arLang,
    );
  }


}
