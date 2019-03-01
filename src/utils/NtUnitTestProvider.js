import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import rootReducer from './../reducers';

const enTranslationData = require('./../translations/en.json');

configure({ adapter: new Adapter() });

function NtUnitTestProvider(component) {
  const store = createStore(rootReducer);
  const jsx = (
    <Provider store={store}>
      <IntlProvider locale="en" messages={enTranslationData}>
        {React.cloneElement(component)}
      </IntlProvider>
    </Provider>
  );
  return {
    jsx,
    store,
    enTranslationData
  };
}

export default NtUnitTestProvider;
