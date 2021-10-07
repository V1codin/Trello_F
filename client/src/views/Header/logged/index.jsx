import { createContext } from "react";
import { useRef } from "react";

import { Menu } from "./components/menu";

const ParentRefContext = createContext(null);

function LoggedHeader() {
  const sectionRef = useRef(null);
  return (
    <ParentRefContext.Provider value={sectionRef}>
      <nav className="userSection" ref={sectionRef}>
        <Menu />
      </nav>
    </ParentRefContext.Provider>
  );
}

export { LoggedHeader, ParentRefContext };
