import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.selected
    };
  }

  handleOnSelectChange(e) {
    this.setState({
      ...this.state,
      val: e.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      val: nextProps.selected
    });
  }

  renderOptions() {
    const { options } = this.props;
    return (
      <>
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </>
    );
  }

  render() {
    const { val } = this.state;
    return (
      <select
        className="nl-select"
        onChange={this.handleOnSelectChange.bind(this)}
        value={val}
      >
        {this.renderOptions()}
      </select>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
