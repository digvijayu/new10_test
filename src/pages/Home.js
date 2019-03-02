import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  appError,
  changeTarget,
  changeBusinessForm,
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
  TERMS,
  MIN_AMT
} from './../utils/constants';

class Home extends Component {
  handleOnAmountChange(newAmount) {
    this.props.changeFinancingValue(newAmount);
  }

  handleOnTargetChange(newTarget) {
    this.props.changeTarget(newTarget);
  }

  handleOnBusinessFormChange(newForm) {
    this.props.changeBusinessForm(newForm);
  }

  handleOnDurationChange(newDuration) {
    let duration = TERMS[3];
    for (let index = 0; index < TERMS.length; index++) {
      if (newDuration === '' + TERMS[index] + this.getMonthText()) {
        duration = TERMS[index];
        break;
      }
    }
    this.props.changeDurationValue(parseInt(duration));
  }

  handleOnDurationChangeFromNum(newDuration) {
    let duration = TERMS[3];
    for (let index = 0; index < TERMS.length; index++) {
      if (newDuration >= TERMS[index]) {
        duration = TERMS[index];
      }
    }
    this.props.changeDurationValue(duration);
  }

  render() {
    const {
      selectedTarget,
      businessForm,
      maxFinancingValue,
      maxDuration,
      selectedDuration,
      selectedAmount,
      rateOfInterest
    } = this.props;

    return (
      <div className="nt-home-page nt-ma-4">
        <div className="nt-title nt-font-2 bold text-center">
          <Text>title</Text>
        </div>

        <div
          className="text-right nt-mt-2"
          onClick={() => {
            this.props.onChangeLang();
          }}
        >
          <span className="nl-primary-link">
            <Text>change.lang</Text>
          </span>
        </div>

        <div className="nt-row">
          <div className="nt-row-item nt-left-row-padding">
            <div className="nl-label">
              <Text>target</Text>
            </div>
            <div>
              <Select
                options={[PRODUCT_MARKETING, PRODUCT_EQUIPMENT]}
                selected={selectedTarget}
                onChange={this.handleOnTargetChange.bind(this)}
              />
            </div>
          </div>
          <div className="nt-row-item nt-right-row-padding">
            <div className="nl-label">
              <Text>business.form</Text>
            </div>
            <div>
              <Select
                options={[LEGAL_BV, LEGAL_EENMANSZAK]}
                selected={businessForm}
                onChange={this.handleOnBusinessFormChange.bind(this)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="nt-row">
            <div className="nt-row-item nl-label nt-left-row-padding">
              <Text>Financing</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding nt-right-col">
              <CurrencyInput
                onChange={this.handleOnAmountChange.bind(this)}
                value={selectedAmount}
                min={MIN_AMT}
                max={maxFinancingValue}
              />
            </div>
          </div>

          <div>
            <RangeSelector
              min={MIN_AMT}
              max={maxFinancingValue}
              value={selectedAmount}
              onChange={this.handleOnAmountChange.bind(this)}
            />
          </div>

          <div className="nt-row">
            <div className="nt-row-item nt-left-row-padding nl-label">
              <Text>Duration</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding nt-right-col">
              <Select
                options={TERMS.filter(item => item <= maxDuration).map(
                  item => '' + item + this.getMonthText()
                )}
                selected={selectedDuration + this.getMonthText()}
                onChange={this.handleOnDurationChange.bind(this)}
              />
            </div>
          </div>

          <div>
            <RangeSelector
              min={TERMS[0]}
              max={maxDuration}
              value={selectedDuration}
              onChange={this.handleOnDurationChangeFromNum.bind(this)}
            />
          </div>
        </div>

        <div className="nt-font-2 nt-mt-2 nt-mb-2 nt-roi">
          <Text>interest</Text> {rateOfInterest}
        </div>

        <div className="nt-row nt-ma-2 nl-flex-center">
          <div className="nt-row-item text-right nt-row-item nt-link">
            <a href="https://new10.com/" className="nl-primary-link">
              <Text>check.link</Text>
            </a>
          </div>
          <div>
            <button className="nl-primary-btn">
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

  getMonthText() {
    return this.props.intl.formatMessage({
      id: 'months'
    });
  }
}

const mapStateToText = state => ({
  selectedTarget: state.appReducer.selectedTarget,
  businessForm: state.appReducer.businessForm,
  maxFinancingValue: state.appReducer.maxFinancingValue,
  maxDuration: state.appReducer.maxDuration,
  selectedDuration: state.appReducer.selectedDuration,
  selectedAmount: state.appReducer.selectedAmount,
  rateOfInterest: state.appReducer.rateOfInterest
});

export const mapDispatch = dispatch => ({
  appError: message => dispatch(appError(message)),
  changeTarget: target => dispatch(changeTarget(target)),
  changeBusinessForm: businessForm =>
    dispatch(changeBusinessForm(businessForm)),
  changeFinancingValue: value => dispatch(changeFinancingValue(value)),
  changeDurationValue: duration => dispatch(changeDurationValue(duration))
});

export default connect(
  mapStateToText,
  mapDispatch
)(injectIntl(Home));
