import { useContext } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";

import { DropDown } from "../../../../../modules/dropdown";

const PopupBody = () => {
  return (
    <>
      <li>
        <div className="popup__body__el">
          <span className="el__span">
            First element of list of notifications from server
          </span>
        </div>
      </li>
    </>
  );
};

function NoteBoardDrop(props) {
  const { toggle } = props;
  const parentRef = useContext(ParentRefContext);

  useOuterCLick(parentRef, toggle);

  const dropProps = {
    toggle,
    heading: "Notifications",
    className: "note",
    popupBody: PopupBody(),
  };

  return <DropDown {...dropProps} />;
}

export { NoteBoardDrop };
