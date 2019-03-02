import React, { Component } from 'react';
import { isFloat } from './../../utils';
import './style.scss';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    const val = props.value || 0;
    this.state = {
      value: val,
      text: val.toString()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
        text: nextProps.value.toString()
      });
    }
  }

  handleOnChange(e) {
    const textNum = e.target.value;
    const { onChange } = this.props;
    this.setState({
      ...this.state,
      text: textNum
    });
    if (isFloat(textNum) && this.props.onChange) {
      this.props.onChange(parseFloat(textNum));
    }
  }

  handleOnBlur(e) {
    const textNum = this.convertTextToNumber(e.target.value);
    const number = parseFloat(textNum);
    if (!isNaN(number)) {
      // send an update outside
      this.setState({
        value: number,
        text: number.toString()
      });
      if (this.props.onChange) {
        this.props.onChange(number);
      }
    } else {
      this.setState({
        value: 0,
        text: '0'
      });
    }
  }

  render() {
    const { value, text } = this.state;
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

export default CurrencyInput;
