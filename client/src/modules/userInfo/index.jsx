import PropTypes from 'prop-types';

import { memo } from 'react';

import { Avatar } from '../avatar';

const UserInfo = memo((props) => {
  const {
    imageURL,
    displayName,
    email,
    click,
    isDisabled,
    classList,
    innerBody
  } = props;

  return (
    <>
      <button
        className={`popup__body__el body_row userInfo ${classList.join(' ')}`}
        onClick={click}
        disabled={isDisabled}
      >
        {innerBody()}
        <Avatar imgLink={imageURL} name={displayName} />
        <div className="account__el">
          <span className="el__span">{displayName}</span>
          <span className="span_email">{email}</span>
        </div>
      </button>
    </>
  );
});

UserInfo.defaultProps = {
  imageURL: '',
  displayName: '',
  email: '',
  click: () => {},
  isDisabled: false,
  classList: [],
  innerBody: () => null
};

UserInfo.propTypes = {
  imageURL: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,

  innerBody: PropTypes.func,
  classList: PropTypes.arrayOf(PropTypes.string),
  click: PropTypes.func
};

export { UserInfo };
