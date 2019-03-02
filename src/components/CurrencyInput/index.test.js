import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import NtUnitTestProvider from './../../utils/NtUnitTestProvider';
import CurrencyInput from './index';

describe('Select - should function properly', () => {
  it('should render the component value if specified', () => {
    const { jsx, store } = NtUnitTestProvider(<CurrencyInput value={200} />);
    const rangeSelector = mount(jsx);
    expect(
      rangeSelector
        .find('CurrencyInput')
        .find('input')
        .instance().value
    ).equal('200');
  });

  it('should render the component with specified value', () => {
    const { jsx, store } = NtUnitTestProvider(<CurrencyInput value={3.0} />);
    const rangeSelector = mount(jsx);
    expect(
      rangeSelector
        .find('CurrencyInput')
        .find('input')
        .instance().value
    ).equal('3');
  });
});
