import { combineReducers } from 'redux';

export const initialAppState = {
  error: {
    message: ''
  },
  selectedTarget: '',
  businessForm: '',
  financingValue: 0,
  durationValue: 0
};

export const appReducer = (
  state = initialAppState,
  action = { type: 'NO_TYPE' }
) => {
  switch (action.type) {
    case 'APPLICATION_ERROR':
      return {
        ...state,
        error: { message: action.message }
      };
    case 'SELECT_TARGET_CHANGE':
      return {
        ...state,
        selectedTarget: action.selectedTarget
      };
    case 'BUSINESS_FROM_TARGET_CHANGE':
      return {
        ...state,
        businessForm: action.businessForm
      };
    case 'FINANCING_VALUE_CHANGE':
      return {
        ...state,
        financingValue: action.financingValue
      };
    case 'DURATION_VALUE_CHANGE':
      return {
        ...state,
        durationValue: action.durationValue
      };
    default:
      return state;
  }
};

export default combineReducers({
  appReducer
});
