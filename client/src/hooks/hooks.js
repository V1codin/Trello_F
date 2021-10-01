import { useCallback, useState, useEffect } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((newS) => {
    if (typeof newS === "boolean") {
      setState(newS);
    } else {
      setState((state) => !state);
    }
  }, []);

  return [state, toggle];
};

const useOuterCLick = (parentRef, clickCb) => {
  const click = useCallback(
    (e) => {
      if (!parentRef?.current?.contains(e.target)) {
        clickCb();
      }
    },
    [parentRef, clickCb]
  );

  useEffect(() => {
    document.addEventListener("click", click, { capture: true });
    return () =>
      document.removeEventListener("click", click, { capture: true });
    // eslint-disable-next-line
  }, []);
};

export { useToggle, useOuterCLick };
