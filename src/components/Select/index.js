import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  renderOptions() {
    const { options, selected } = this.props;
    return (
      <>
        {options.map((option, index) => (
          <option selected={selected === option} key={index}>
            {option}
          </option>
        ))}
      </>
    );
  }

  render() {
    return <select className="nl-select">{this.renderOptions()}</select>;
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string
};

export default Select;
