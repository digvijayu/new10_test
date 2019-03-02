import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class RangeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.min
    };
  }

  handleOnChange(e) {
    this.setState({
      ...this.state,
      value: e.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(parseFloat(e.target.value));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    const { min, max, steps } = this.props;
    const { value } = this.state;
    return (
      <div>
        <input
          className="nt-range-selector"
          type="range"
          min={min}
          max={max}
          steps={steps}
          value={value}
          onChange={this.handleOnChange.bind(this)}
        />
      </div>
    );
  }
}

RangeSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  steps: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default RangeSelector;
