import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFloat, numberWithCommas, removeComma } from './../../utils';
import './style.scss';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    const val = props.value || 0;
    this.state = {
      value: val,
      text: numberWithCommas(val),
      isFocussed: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      if (this.state.isFocussed) {
        this.setState({
          ...this.state,
          value: nextProps.value,
          text: nextProps.value.toString()
        });
      } else {
        this.setState({
          ...this.state,
          value: nextProps.value,
          text: numberWithCommas(nextProps.value)
        });
      }
    }
  }

  handleOnChange(e) {
    const textNum = e.target.value;
    const { min, max } = this.props;
    this.setState({
      ...this.state,
      text: textNum
    });
    const number = parseFloat(textNum);
    if (
      isFloat(textNum) &&
      this.props.onChange &&
      number >= min &&
      number <= max
    ) {
      this.props.onChange(parseFloat(textNum));
    }
  }

  handleOnFocus() {
    this.setState({
      ...this.state,
      isFocussed: true,
      text: removeComma(this.state.text)
    });
  }

  handleOnBlur(e) {
    const textNum = this.convertTextToNumber(e.target.value);
    const { min, max } = this.props;
    let number = parseFloat(textNum);
    if (number < min) {
      number = min;
    }

    if (number > max) {
      number = max;
    }

    if (!isNaN(number)) {
      // send an update outside
      this.setState({
        ...this.state,
        value: number,
        text: numberWithCommas(number),
        isFocussed: false
      });
      if (this.props.onChange) {
        this.props.onChange(number);
      }
    } else {
      this.setState({
        ...this.state,
        value: min,
        text: numberWithCommas(min),
        isFocussed: false
      });
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div className="nt-row nt-currency-input-container">
        <div className="nt-symbol">€</div>
        <div className="nt-input-col">
          <input
            className="nt-currency-input"
            type="text"
            value={text}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            onFocus={this.handleOnFocus.bind(this)}
          />
        </div>
      </div>
    );
  }

  convertTextToNumber(textNum) {
    textNum = textNum.replace(/[^0-9.]/g, '');
    textNum = textNum.replace(/\.+/g, '.');
    textNum = textNum.replace(/(.*\.[0-9][0-9][0-9]?).*/g, '$1');
    textNum = textNum.replace(/^0+(.*)$/, '0$1');
    textNum = textNum.replace(/^0([^.].*)$/, '$1');
    return textNum;
  }
}

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

export default CurrencyInput;
