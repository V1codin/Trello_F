import React from "react";

import { useState } from "react";

import { useDebouncedFetch } from "../../../../../hooks/hooks";

import { auth } from "../../../../../api/auth.api";

import { Button } from "../../../../../modules/button";
import { FormWrapper } from "../../../../../modules/formWrapper";
import { DropDown } from "../../../../../modules/dropdown";
import { InnerList } from "./InnerList";
import { useEffect } from "react";

// TODO to avoid many re-renders make decompose
// TODO create redux state for checkbox values

// ! TO DO SUBMIT BUTTON

const PopupBody = (props) => {
  const {
    changeHandler,
    requestUsersState,
    loading,
    ownerId,
    boardId,
    requestUsersState: { users, value },
  } = props;

  const [checks, setChecks] = useState({});

  const buttonProps = {
    submit: () => console.log(checks),
    btnText: "SEND INVITATION",
    loading,
    btnClassList: ["w_100pr"],
    classList: ["w_100pr"],
  };

  return (
    <>
      {users.length > 0 && (
        <InnerList
          users={users}
          boardId={boardId}
          ownerId={ownerId}
          setChecks={setChecks}
          checks={checks}
        />
      )}

      <li className="list__body_li">
        <FormWrapper form={requestUsersState}>
          <>
            <input
              type="text"
              name="invite"
              className="form__input add__list__input"
              placeholder="Email or name"
              onChange={changeHandler}
              value={value}
              autoFocus
            />
            <Button {...buttonProps} />
          </>
        </FormWrapper>
      </li>
    </>
  );
};

function InviteDrop(props) {
  const { toggle, boardId, ownerId } = props;

  const [users, setUsers] = useState([]);

  const {
    setInputText,
    inputText,
    search: { loading, result },
  } = useDebouncedFetch(async (text) => auth.getUsersFromRegex(text));

  const changeHandler = async (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  useEffect(() => {
    if (Array.isArray(result)) {
      setUsers(result);
    }
  }, [result]);

  const requestUsersState = {
    value: inputText,
    className: "invite__form",
    users,
  };

  const dropProps = {
    toggle,
    heading: "Invite to board",
    classList: ["add"],
    popupBody: PopupBody({
      ownerId,
      changeHandler,
      requestUsersState,
      boardId,
      loading,
    }),
  };

  return <DropDown {...dropProps} />;
}

export { InviteDrop };
