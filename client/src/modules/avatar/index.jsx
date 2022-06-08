import PropTypes from 'prop-types';

import { createAvatarComponent, SrcSource, ValueSource } from 'react-avatar';
// import Ava from "react-avatar";

import './Avatar.css';

const Ava = createAvatarComponent({ sources: [SrcSource, ValueSource] });
function Avatar(props) {
  const { imgLink, name, size, classList } = props;

  return (
    <>
      {imgLink === '' ? (
        <Ava
          alt="avatar"
          round={true}
          name={name}
          className={`avatar colored unselectable ${classList.join(' ')}`}
          size={size}
          maxInitials={2}
        />
      ) : (
        <Ava
          alt="avatar"
          round={true}
          src={imgLink}
          name={name}
          className={`avatar ${classList.join(' ')}`}
          size={size}
          maxInitials={2}
        />
      )}
    </>
  );
}

Avatar.defaultProps = {
  imgLink: '',
  name: '',
  size: 40,
  classList: []
};

Avatar.propTypes = {
  imgLink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  classList: PropTypes.arrayOf(PropTypes.string)
};

export { Avatar };
