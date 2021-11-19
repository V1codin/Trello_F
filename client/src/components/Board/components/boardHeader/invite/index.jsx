import { useState, useRef } from "react";

import { useOuterCLick } from "../../../../../hooks/hooks";

import { InviteDrop } from "./InviteDrop";

function Invite(props) {
  const { boardId, ownerId } = props;

  const [isDrop, setDrop] = useState(false);
  const parentRef = useRef(null);

  const toggle = () => {
    setDrop((prev) => !prev);
  };

  useOuterCLick(parentRef, () => setDrop(false));

  return (
    <section className="invite" ref={parentRef}>
      {isDrop ? (
        <InviteDrop toggle={toggle} boardId={boardId} ownerId={ownerId} />
      ) : null}
      <button
        className={`add__toggler card_design invite__btn ${
          isDrop ? "active" : ""
        }`}
        onClick={toggle}
      >
        Invite
      </button>
    </section>
  );
}

export { Invite };
