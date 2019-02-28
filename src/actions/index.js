export const appError = message => ({
  type: 'APPLICATION_ERROR',
  message
});

export const changeTarget = selectedTarget => ({
  type: 'SELECT_TARGET_CHANGE',
  selectedTarget
});

export const changeBusinessFrom = businessForm => ({
  type: 'BUSINESS_FROM_TARGET_CHANGE',
  businessForm
});

export const changeFinancingValue = financingValue => ({
  type: 'FINANCING_VALUE_CHANGE',
  financingValue
});

export const changeDurationValue = durationValue => ({
  type: 'DURATION_VALUE_CHANGE',
  durationValue
});
