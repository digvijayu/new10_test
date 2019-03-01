import {
  appError,
  changeTarget,
  changeBusinessForm,
  changeFinancingValue,
  changeDurationValue
} from './index';

describe('Application Actions Tests', () => {
  it('should counstuct action, appError', () => {
    expect(appError('Random test error message.')).toEqual({
      type: 'APPLICATION_ERROR',
      message: 'Random test error message.'
    });
  });

  it('should counstuct action, changeTarget', () => {
    expect(changeTarget('new_target')).toEqual({
      type: 'SELECT_TARGET_CHANGE',
      selectedTarget: 'new_target'
    });
  });

  it('should counstuct action, changeBusinessForm', () => {
    expect(changeBusinessForm('new_business_form')).toEqual({
      type: 'BUSINESS_FROM_TARGET_CHANGE',
      businessForm: 'new_business_form'
    });
  });

  it('should counstuct action, changeFinancingValue', () => {
    expect(changeFinancingValue(3000)).toEqual({
      type: 'FINANCING_VALUE_CHANGE',
      financingValue: 3000
    });
  });

  it('should counstuct action, changeDurationValue', () => {
    expect(changeDurationValue(3)).toEqual({
      type: 'DURATION_VALUE_CHANGE',
      durationValue: 3
    });
  });
});
