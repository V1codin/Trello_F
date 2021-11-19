import React from "react";

function UserInfoBody(props) {
  const { inputChange, value } = props;

  return (
    <>
      <input
        type="checkbox"
        name="invited"
        onChange={inputChange}
        className="userInfo__check"
        checked={value}
      />
    </>
  );
}

export { UserInfoBody };
