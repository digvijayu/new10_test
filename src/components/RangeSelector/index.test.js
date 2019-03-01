import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import NtUnitTestProvider from './../../utils/NtUnitTestProvider';
import RangeSelector from './index';

describe('Select - should function properly', () => {
  it('should render the component default min value if not specified', () => {
    const { jsx, store } = NtUnitTestProvider(
      <RangeSelector min={0} max={10} steps={2} />
    );
    const rangeSelector = mount(jsx);
    expect(rangeSelector.find('RangeSelector').state().value).equal(0);
  });

  it('should render the component with specified value', () => {
    const { jsx, store } = NtUnitTestProvider(
      <RangeSelector min={0} max={10} steps={2} value={3} />
    );
    const rangeSelector = mount(jsx);
    expect(rangeSelector.find('RangeSelector').state().value).equal(3);
  });

  it('should change the value', () => {
    const { jsx, store } = NtUnitTestProvider(
      <RangeSelector min={0} max={10} steps={2} value={3} />
    );
    const rangeSelector = mount(jsx);
    const input = rangeSelector
      .find('RangeSelector')
      .find('.nt-range-selector');
    input.simulate('change', { target: { value: '9' } });

    expect(
      rangeSelector
        .find('RangeSelector')
        .find('.nt-range-selector')
        .instance().value
    ).equal('9');
  });
});
