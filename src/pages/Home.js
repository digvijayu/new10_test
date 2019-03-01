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
import {
  PRODUCT_MARKETING,
  PRODUCT_EQUIPMENT,
  LEGAL_BV,
  LEGAL_EENMANSZAK,
  TERMS
} from './../utils/constants';

class Home extends Component {
  render() {
    return (
      <div className="nt-home-page nt-ma-4">
        <div className="nt-title nt-font-2 bold text-center">
          <Text>title</Text>
        </div>

        <div className="nt-row">
          <div className="nt-row-item nt-left-row-padding">
            <div>
              <Text>target</Text>
            </div>
            <div>
              <Select options={[PRODUCT_MARKETING,
              PRODUCT_EQUIPMENT]}/>
            </div>
          </div>
          <div className="nt-row-item nt-right-row-padding">
            <div>
              <Text>business.form</Text>
            </div>
            <div>
              <Select options={[LEGAL_BV,
              LEGAL_EENMANSZAK]}/>
            </div>
          </div>
        </div>

        <div>
          <div className="nt-row">
            <div className="nt-row-item nt-left-row-padding">
              <Text>financing</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding">
              
            </div>
          </div>
          <div>
            <RangeSelector />
          </div>
          <div className="nt-row">
            <div className="nt-row-item nt-left-row-padding">
              <Text>duration</Text>
            </div>
            <div className="nt-row-item nt-right-row-padding">
              <Select options={TERMS.map(item => '' + item)}/>
            </div>
          </div>
          <div>
            <RangeSelector />
          </div>
        </div>

        <div className="nt-row">
          <div className="nt-row-item">
            <a>
              <Text>check.link</Text>
            </a>
          </div>
          <div className="nt-row-item">
            <button>
              <Text>check.link</Text>
            </button>
          </div>
        </div>

        <div>
          <Text>footer.description</Text>
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
