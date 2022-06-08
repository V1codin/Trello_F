import React from 'react';

import PropTypes from 'prop-types';

// ? import svg as react component for render row svg
import { ReactComponent as Spinner } from '../../assets/pulse.svg';

import './Process.css';

function Process(props) {
  const { isShown } = props;
  const wrapperStyles = props?.styles;

  return isShown === true ? (
    <div className="wrapper" style={{ ...wrapperStyles }}>
      <div className="spinner">
        <Spinner />
      </div>
    </div>
  ) : null;
}

Process.defaultProps = {
  isShown: false
};

Process.propTypes = {
  isShown: PropTypes.bool.isRequired,
  wrapperStyles: PropTypes.object
};

export { Process };
