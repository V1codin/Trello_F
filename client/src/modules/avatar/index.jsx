import PropTypes from "prop-types";

import Ava from "react-avatar";

import "./Avatar.css";

function Avatar(props) {
  const { imgLink, name } = props;

  return (
    <>
      {imgLink === "" ? (
        <Ava
          alt="avatar"
          round={true}
          name={name}
          className="avatar colored unselectable"
          size={40}
        />
      ) : (
        <Ava
          alt="avatar"
          round={true}
          src={imgLink}
          name={name}
          className="avatar"
          size={40}
        />
      )}
    </>
  );
}

Avatar.defaultProps = {
  imgLink: "",
  name: "",
};

Avatar.propTypes = {
  imgLink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export { Avatar };
