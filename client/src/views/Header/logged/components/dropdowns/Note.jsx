import { useContext, Children } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";

import { Note } from "../../../../../components/Notification";
import { DropDown } from "../../../../../modules/dropdown";

const PopupBody = (props) => {
  const { notes } = props;

  return notes.length > 0
    ? Children.toArray(
        notes.map((note) => {
          return <Note {...note} />;
        })
      )
    : null;
};

function NoteBoardDrop(props) {
  const { toggle, notes } = props;
  const parentRef = useContext(ParentRefContext);

  useOuterCLick(parentRef, toggle);

  const dropProps = {
    toggle,
    heading: "Notifications",
    classList: ["note"],
    popupBody: PopupBody({ notes }),
  };

  return <DropDown {...dropProps} />;
}

export { NoteBoardDrop };
