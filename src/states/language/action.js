const ActionType = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  TOGGLE_LANGUAGE: 'TOGGLE_LANGUAGE',
};

function setLanguageActionCreator(language) {
  return {
    type: ActionType.SET_LANGUAGE,
    payload: {
      language,
    },
  };
}

function toggleLanguageActionCreator() {
  return {
    type: ActionType.TOGGLE_LANGUAGE,
  };
}

export { ActionType, setLanguageActionCreator, toggleLanguageActionCreator };
