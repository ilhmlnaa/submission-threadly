import { describe, it, expect } from 'vitest';
import languageReducer from '../../../states/language/reducer';
import { ActionType } from '../../../states/language/action';

describe('languageReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = 'en';
    const action = { type: 'UNKNOWN' };

    const nextState = languageReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the language when given by SET_LANGUAGE action', () => {
    const initialState = 'en';
    const action = {
      type: ActionType.SET_LANGUAGE,
      payload: {
        language: 'id',
      },
    };

    const nextState = languageReducer(initialState, action);

    expect(nextState).toEqual(action.payload.language);
  });

  it('should return the toggled language (en to id) when given by TOGGLE_LANGUAGE action', () => {
    const initialState = 'en';
    const action = {
      type: ActionType.TOGGLE_LANGUAGE,
    };

    const nextState = languageReducer(initialState, action);

    expect(nextState).toEqual('id');
  });

  it('should return the toggled language (id to en) when given by TOGGLE_LANGUAGE action', () => {
    const initialState = 'id';
    const action = {
      type: ActionType.TOGGLE_LANGUAGE,
    };

    const nextState = languageReducer(initialState, action);

    expect(nextState).toEqual('en');
  });
});
