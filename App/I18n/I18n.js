import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fallback:
I18n.translations = {
  en: require('./english.json')
}

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  /*
  case 'fr':
    I18n.translations.fr = require('./fr.json')
    break
  */
}
