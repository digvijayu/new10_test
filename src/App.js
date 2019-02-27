import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_nl from 'react-intl/locale-data/nl';

import rootReducer from './reducers';
import './App.scss';
import Home from './pages/Home';
import messages_nl from './translations/nl.json';
import messages_en from './translations/en.json';
import { isSupportedLanguage } from './utils';

const messages = {
  nl: messages_nl,
  en: messages_en
};

addLocaleData([...locale_en, ...locale_nl]);

const store = createStore(rootReducer);

class App extends Component {
  render() {
    let language = navigator.language.split(/[-_]/)[0]; // language without region code
    language = isSupportedLanguage(language) ? language : 'en';

    return (
      <Provider store={store}>
        <IntlProvider locale={language} messages={messages[language]}>
          <div className="nt-app">
            <Home />
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
