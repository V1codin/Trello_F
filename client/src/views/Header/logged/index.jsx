import { createContext } from "react";
import { useRef } from "react";

import { Menu } from "./components/menu";
import { Avatar } from "../../../modules/avatar";

const ParentRefContext = createContext(null);

function LoggedHeader(props) {
  const { imgLink, name } = props;
  const sectionRef = useRef(null);
  return (
    <ParentRefContext.Provider value={sectionRef}>
      <section className="userSection" ref={sectionRef}>
        <Menu />
        <Avatar imgLink={imgLink} name={name} />
      </section>
    </ParentRefContext.Provider>
  );
}

export { LoggedHeader, ParentRefContext };
