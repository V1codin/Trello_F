import React from "react";

import { useState, useRef } from "react";

import { useOuterCLick } from "../../../../hooks/hooks";
import { DropDown } from "../../../../modules/dropdown";

import moreDots from "../../../../assets/more.svg";

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
  const { deleteFn } = props;

  const [isDropDown, setDropDown] = useState(false);

  const parentRef = useRef(null);

  const toggle = () => {
    setDropDown((prev) => !prev);
  };

  useOuterCLick(parentRef, () => setDropDown(false));

  const dropProps = {
    toggle,
    heading: "List actions",
    popupBody: PopupBody({ deleteList: deleteFn(() => setDropDown(false)) }),
    classList: ["list_drop"],
  };

  return (
    <>
      <section className="list__btnSection" ref={parentRef}>
        <button className="menu__btn more__btn" onClick={toggle}>
          <img
            src={moreDots}
            alt="more"
            className="menu__ico"
            title="List actions"
          />
        </button>
        {isDropDown ? <DropDown {...dropProps} /> : null}
      </section>
    </>
  );
}

export { ListDropDown };
