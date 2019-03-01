import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import NtUnitTestProvider from './../../utils/NtUnitTestProvider';
import Select from './index';


describe('Select - should function properly', () => {
  it('should render the component with specified options', () => {
    const { jsx, store } = NtUnitTestProvider(
      <Select options={['option1', 'option2']}/>
    );
    const drawer = mount(jsx);
    expect(
      drawer
        .find('Select')
        .find('option')
        .at(0)
        .text()
    ).equal('option1');

    expect(
      drawer
        .find('Select')
        .find('option')
        .at(1)
        .text()
    ).equal('option2');
  });
});
