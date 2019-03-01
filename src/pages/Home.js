import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  appError,
  changeTarget,
  changeBusinessFrom,
  changeFinancingValue,
  changeDurationValue
} from './../actions';
import './style.scss';
import Text from './../components/Text';
import Select from './../components/Select';
import RangeSelector from './../components/RangeSelector';
import CurrencyInput from './../components/CurrencyInput';
import {
  PRODUCT_MARKETING,
  PRODUCT_EQUIPMENT,
  LEGAL_BV,
  LEGAL_EENMANSZAK,
  TERMS
} from './../utils/constants';

class Home extends Component {
  handleOnAmountChange(newAmount) {
    console.log('update amount', newAmount);
  }

  render() {
    return (
      <div className="nt-home-page nt-ma-4">
        <div className="nt-title nt-font-2 bold text-center">
          <Text>title</Text>
        </div>

        <div className="nt-row">
          <div className="nt-row-item nt-left-row-padding">
            <div className="nl-label">
              <Text>target</Text>
            </div>
            <div>
              <Select options={[PRODUCT_MARKETING, PRODUCT_EQUIPMENT]} />
            </div>
          </div>
          <div className="nt-row-item nt-right-row-padding">
            <div className="nl-label">
              <Text>business.form</Text>
            </div>
            <div>
              <Select options={[LEGAL_BV, LEGAL_EENMANSZAK]} />
            </div>
          </div>
        </div>

        <div>
          <div className="nt-row">
            <div className="nt-row-item nl-label nt-left-row-padding">
              <Text>Financing</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding nt-right-col">
              <CurrencyInput onChange={this.handleOnAmountChange.bind(this)} />
            </div>
          </div>

          <div>
            <RangeSelector />
          </div>

          <div className="nt-row">
            <div className="nt-row-item nt-left-row-padding nl-label">
              <Text>Duration</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding nt-right-col">
              <Select options={TERMS.map(item => '' + item)} />
            </div>
          </div>

          <div>
            <RangeSelector />
          </div>
        </div>

        <div className="nt-row nt-ma-2 nl-flex-center">
          <div className="nt-row-item text-right nt-row-item nt-mr-2">
            <a href="#" className="nl-primary-link">
              <Text>check.link</Text>
            </a>
          </div>
          <div>
            <button class="nl-primary-btn">
              <Text>check.link</Text>
            </button>
          </div>
        </div>

        <div className="nl-footer-text">
          <Text>footer.description1</Text>
          <b>
            <Text>footer.description2</Text>
          </b>
          <Text>footer.description3</Text>
        </div>
      </div>
    );
  }
}

const mapStateToText = state => ({
  selectedTarget: state.appReducer.selectedTarget,
  businessForm: state.appReducer.businessForm,
  financingValue: state.appReducer.financingValue,
  durationValue: state.appReducer.durationValue
});

export const mapDispatch = dispatch => ({
  appError: message => dispatch(appError(message))
});

export default connect(
  mapStateToText,
  mapDispatch
)(Home);
