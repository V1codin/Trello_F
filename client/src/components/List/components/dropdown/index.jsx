import React from "react";

import { useState } from "react";

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
  const { parentRef, deleteFn } = props;

  const [isDropDown, setDropDown] = useState(false);

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
      <section className="list__btnSection">
        <button className="menu__btn more__btn" onClick={toggle}>
          <img src={moreDots} alt="more" className="menu__ico" />
        </button>
      </section>
      {isDropDown ? <DropDown {...dropProps} /> : null}
    </>
  );
}

export { ListDropDown };
