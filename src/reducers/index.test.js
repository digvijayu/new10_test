import {
  appError,
  changeTarget,
  changeBusinessForm,
  changeFinancingValue,
  changeDurationValue
} from './../actions';
import {
  initialAppState,
  appReducer,
  getMaxAmount,
  getMaxDuration
} from './index';
import {
  PRODUCT_MARKETING,
  PRODUCT_EQUIPMENT,
  LEGAL_BV,
  LEGAL_EENMANSZAK,
  TERMS
} from './../utils/constants';

describe('Application Reducers Tests', () => {
  it('should verify the initial state', () => {
    expect(initialAppState).toEqual({
      error: {
        message: ''
      },
      selectedTarget: PRODUCT_MARKETING,
      businessForm: LEGAL_BV,
      maxFinancingValue: 250000,
      maxDuration: 36,
      selectedDuration: 12,
      selectedAmount: 250000,
      rateOfInterest: 4
    });
  });

  it('should reduce the application error action', () => {
    const newState = appReducer(initialAppState, appError('Some Message'));
    expect(newState).toEqual({
      ...initialAppState,
      error: {
        message: 'Some Message'
      }
    });
  });

  it('should reduce the application target change', () => {
    const newState = appReducer(
      initialAppState,
      changeTarget(PRODUCT_MARKETING)
    );
    expect(newState).toEqual({
      ...initialAppState,
      selectedTarget: PRODUCT_MARKETING
    });
  });

  it('should reduce the application business form change', () => {
    const newState = appReducer(
      initialAppState,
      changeBusinessForm('new_business_form')
    );
    expect(newState).toEqual({
      ...initialAppState,
      businessForm: 'new_business_form'
    });
  });

  it('should reduce the application financing value change', () => {
    const newState = appReducer(initialAppState, changeFinancingValue(3000));
    expect(newState).toEqual({
      ...initialAppState,
      selectedAmount: 3000,
      rateOfInterest: 6
    });
  });

  it('should reduce the application duration value change', () => {
    const newState = appReducer(initialAppState, changeDurationValue(6));
    expect(newState).toEqual({
      ...initialAppState,
      selectedDuration: 6
    });
  });

  it('should get the max amount for all combinations, getMaxAmount', () => {
    const input = [
      { selectedTarget: PRODUCT_MARKETING, businessForm: LEGAL_BV },
      { selectedTarget: PRODUCT_MARKETING, businessForm: LEGAL_EENMANSZAK },
      { selectedTarget: PRODUCT_EQUIPMENT, businessForm: LEGAL_BV },
      { selectedTarget: PRODUCT_EQUIPMENT, businessForm: LEGAL_EENMANSZAK }
    ];
    const output = input.map(selection => {
      return getMaxAmount(selection.selectedTarget, selection.businessForm);
    });
    expect(output).toEqual([250000, 250000, 500000, 250000]);
  });

  it('should get the max amount for all combinations, getMaxDuration', () => {
    const input = [
      { selectedTarget: PRODUCT_MARKETING },
      { selectedTarget: PRODUCT_EQUIPMENT }
    ];
    const output = input.map(selection => {
      return getMaxDuration(selection.selectedTarget);
    });
    expect(output).toEqual([36, 60]);
  });
});
