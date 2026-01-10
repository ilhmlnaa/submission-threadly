const ActionType = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME',
};

function setThemeActionCreator(theme) {
  return {
    type: ActionType.SET_THEME,
    payload: {
      theme,
    },
  };
}

function toggleThemeActionCreator() {
  return {
    type: ActionType.TOGGLE_THEME,
  };
}

export { ActionType, setThemeActionCreator, toggleThemeActionCreator };
