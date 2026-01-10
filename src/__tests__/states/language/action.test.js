import { describe, it, expect } from 'vitest';
import {
  ActionType,
  setLanguageActionCreator,
  toggleLanguageActionCreator,
} from '../../../states/language/action';

describe('languageAction', () => {
  it('should create an action to set language correctly', () => {
    const language = 'id';
    const expectedAction = {
      type: ActionType.SET_LANGUAGE,
      payload: {
        language,
      },
    };

    const action = setLanguageActionCreator(language);

    expect(action).toEqual(expectedAction);
  });

  it('should create an action to toggle language correctly', () => {
    const expectedAction = {
      type: ActionType.TOGGLE_LANGUAGE,
    };

    const action = toggleLanguageActionCreator();

    expect(action).toEqual(expectedAction);
  });
});
