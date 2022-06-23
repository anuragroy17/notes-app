const getStoredTheme = () => {
  const isDark = localStorage.getItem('isDark');
  return !isDark ? false : JSON.parse(isDark.toLowerCase());
};

export const initialState = {
  isDark: getStoredTheme(),
  isOpen: false,
};

export const actionTypes = {
  SET_THEME: 'SET_THEME',
  SET_DRAWER: 'SET_DRAWER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      localStorage.setItem('isDark', action.isDark);
      return {
        ...state,
        isDark: action.isDark,
      };
    case actionTypes.SET_DRAWER:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    default:
      return state;
  }
};

export default reducer;
