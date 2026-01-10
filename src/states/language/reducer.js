import { ActionType } from './action';

const savedLanguage = localStorage.getItem('language') || 'en';

function languageReducer(language = savedLanguage, action = {}) {
  switch (action.type) {
  case ActionType.SET_LANGUAGE:
    return action.payload.language;
  case ActionType.TOGGLE_LANGUAGE:
    return language === 'en' ? 'id' : 'en';
  default:
    return language;
  }
}

export default languageReducer;
