import { combineReducers } from 'redux';
import {
  PRODUCT_MARKETING,
  PRODUCT_EQUIPMENT,
  LEGAL_BV,
  LEGAL_EENMANSZAK,
  TERMS
} from './../utils/constants';

export const getMaxAmount = (selectedTarget, businessForm) => {
  return selectedTarget == PRODUCT_EQUIPMENT && businessForm == LEGAL_BV
    ? 500000
    : 250000;
};

export const getMaxDuration = selectedTarget => {
  return selectedTarget == PRODUCT_MARKETING ? 36 : 60;
};

export const getRateOfInterest = (amount, duration) => {
  let interestArray = [];
  if (amount < 50000) {
    interestArray = [6, 7, 8];
  } else if (amount < 150000 && amount >= 50000) {
    interestArray = [5, 6, 7];
  } else {
    interestArray = [4, 5, 6];
  }
  if (duration <= 20) {
    return interestArray[0];
  } else if (duration <= 40 && duration > 20) {
    return interestArray[1];
  } else {
    return interestArray[2];
  }
};

export const initialAppState = {
  error: {
    message: ''
  },
  selectedTarget: PRODUCT_MARKETING,
  businessForm: LEGAL_BV,
  maxFinancingValue: getMaxAmount(PRODUCT_MARKETING, LEGAL_BV),
  maxDuration: getMaxDuration(PRODUCT_MARKETING),
  selectedDuration: TERMS[3],
  selectedAmount: getMaxAmount(PRODUCT_MARKETING, LEGAL_BV),
  rateOfInterest: getRateOfInterest(
    getMaxAmount(PRODUCT_MARKETING, LEGAL_BV),
    TERMS[3]
  )
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
      const maxAmount = getMaxAmount(action.selectedTarget, state.businessForm);
      const maxDuration = getMaxDuration(action.selectedTarget);
      const selectedAmount =
        state.selectedAmount > maxAmount ? maxAmount : state.selectedAmount;
      const selectedDuration =
        state.selectedDuration > maxDuration
          ? maxDuration
          : state.selectedDuration;
      return {
        ...state,
        selectedTarget: action.selectedTarget,
        maxFinancingValue: maxAmount,
        maxDuration: maxDuration,
        selectedDuration: selectedDuration,
        selectedAmount: selectedAmount,
        rateOfInterest: getRateOfInterest(selectedAmount, selectedDuration)
      };
    case 'BUSINESS_FROM_TARGET_CHANGE':
      const maxAmountTargetChange = getMaxAmount(
        state.selectedTarget,
        action.businessForm
      );
      const selectedAmountTargetChange =
        state.selectedAmount > maxAmountTargetChange
          ? maxAmountTargetChange
          : state.selectedAmount;
      return {
        ...state,
        businessForm: action.businessForm,
        maxFinancingValue: maxAmountTargetChange,
        selectedAmount: selectedAmountTargetChange,
        rateOfInterest: getRateOfInterest(
          selectedAmountTargetChange,
          state.selectedDuration
        )
      };
    case 'FINANCING_VALUE_CHANGE':
      let val =
        action.financingValue >
        getMaxAmount(state.selectedTarget, state.businessForm)
          ? getMaxAmount(state.selectedTarget, state.businessForm)
          : action.financingValue;
      return {
        ...state,
        selectedAmount: val,
        rateOfInterest: getRateOfInterest(val, state.selectedDuration)
      };
    case 'DURATION_VALUE_CHANGE':
      let dur =
        action.durationValue > getMaxDuration(state.selectedTarget)
          ? getMaxDuration(state.selectedTarget)
          : action.durationValue;
      return {
        ...state,
        selectedDuration: dur,
        rateOfInterest: getRateOfInterest(state.selectedAmount, dur)
      };
    default:
      return state;
  }
};

export default combineReducers({
  appReducer
});
