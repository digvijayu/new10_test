import {
  appError,
  changeTarget,
  changeBusinessForm,
  changeFinancingValue,
  changeDurationValue
} from './../actions';
import { initialAppState, appReducer } from './index';

describe('Application Reducers Tests', () => {
  it('should verify the initial state', () => {
    expect(initialAppState).toEqual({
      error: {
        message: ''
      },
      selectedTarget: '',
      businessForm: '',
      financingValue: 0,
      durationValue: 0
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
    const newState = appReducer(initialAppState, changeTarget('new_target'));
    expect(newState).toEqual({
      ...initialAppState,
      selectedTarget: 'new_target'
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
      financingValue: 3000
    });
  });

  it('should reduce the application duration value change', () => {
    const newState = appReducer(initialAppState, changeDurationValue(6));
    expect(newState).toEqual({
      ...initialAppState,
      durationValue: 6
    });
  });
});
