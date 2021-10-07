import Ava from "react-avatar";

import "./Avatar.css";

function Avatar(props) {
  const { imgLink, name } = props;

  return (
    <>
      {imgLink === "" ? (
        <Ava
          round={true}
          name={name}
          className="avatar colored unselectable"
          size={40}
        />
      ) : (
        <Ava
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

export { Avatar };
