import { ActionType } from './action';

function themeReducer(theme = 'dark', action = {}) {
  switch (action.type) {
  case ActionType.SET_THEME:
    return action.payload.theme;
  case ActionType.TOGGLE_THEME:
    return theme === 'dark' ? 'light' : 'dark';
  default:
    return theme;
  }
}

export default themeReducer;
