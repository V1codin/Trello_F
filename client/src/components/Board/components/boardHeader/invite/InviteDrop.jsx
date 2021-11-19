import React from "react";

import { useState } from "react";

import { useDebouncedFetch } from "../../../../../hooks/hooks";
import { auth } from "../../../../../api/auth.api";

import { Form } from "../../../../../modules/form";
import { DropDown } from "../../../../../modules/dropdown";
import { InnerList } from "./InnerList";
import { useEffect } from "react";

// TODO to avoid many re-renders make decompose
// TODO create redux state for checkbox values

const PopupBody = (props) => {
  const {
    changeHandler,
    requestUsersState,
    loading,
    ownerId,
    boardId,
    requestUsersState: { users },
  } = props;

  const [checks, setChecks] = useState({});

  const formProps = {
    type: "invite",
    inputPlaceholder: "Email or name",
    form: requestUsersState,
    submit: () => console.log(checks),
    changeHandler,
    btnText: "SEND INVITATION",
    loading,
    btnClassList: ["w_100pr"],
    classList: ["w_100pr"],
  };

  return (
    <>
      {users.length > 0 ? (
        <InnerList
          users={users}
          boardId={boardId}
          ownerId={ownerId}
          setChecks={setChecks}
          checks={checks}
        />
      ) : null}
      <li className="list__body_li">
        <Form {...formProps} />
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
