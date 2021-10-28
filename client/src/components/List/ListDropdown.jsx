import React from "react";

import { useOuterCLick } from "../../hooks/hooks";
import { DropDown } from "../../modules/dropdown";

const PopupBody = (props) => {
  const { deleteList } = props;
  return (
    <>
      <li className="body_add">
        <button className="popup__body__el" onClick={deleteList}>
          <span className="el__span">Delete the list</span>
          <p className="el__article">Deleting this list</p>
        </button>
      </li>
    </>
  );
};

function ListDropDown(props) {
  const { deleteList, toggle, parentRef } = props;

  useOuterCLick(parentRef, toggle);

  const dropProps = {
    toggle,
    heading: "List actions",
    popupBody: PopupBody({ deleteList }),
    classList: ["list_drop"],
  };

  return <DropDown {...dropProps} />;
}

export { ListDropDown };
