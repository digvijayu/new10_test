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
import { getLanguage } from './utils';
import { SUPPORTED_LANGUAGES } from './utils/constants';

const messages = {
  nl: messages_nl,
  en: messages_en
};

addLocaleData([...locale_en, ...locale_nl]);

const store = createStore(rootReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: getLanguage()
    };
  }

  handleOnLangChange() {
    this.setState({
      ...this.state,
      lang:
        this.state.lang === SUPPORTED_LANGUAGES[0]
          ? SUPPORTED_LANGUAGES[1]
          : SUPPORTED_LANGUAGES[0]
    });
  }

  render() {
    const { lang } = this.state;
    return (
      <Provider store={store}>
        <IntlProvider locale={lang} messages={messages[lang]}>
          <div className="nt-app">
            <Home onChangeLang={this.handleOnLangChange.bind(this)} />
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
