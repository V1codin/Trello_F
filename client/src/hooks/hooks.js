import { useCallback, useState, useEffect, useRef } from "react";
import { isLink } from "../utils/helpers";
import { BG_IMAGE, BODY_REF } from "../utils/constants";

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

const useOuterCLick = (parentRef, ...callbacks) => {
  const click = useCallback(
    (e) => {
      if (!parentRef.current?.contains(e.target) || e.code === "Escape") {
        callbacks.forEach((callback) => callback());
      }
    },
    [parentRef, callbacks]
  );

  useEffect(() => {
    document.addEventListener("click", click, { capture: true });

    document.addEventListener("keydown", click);

    return () => {
      document.removeEventListener("click", click, { capture: true });
      document.removeEventListener("keydown", click);
    };
    // eslint-disable-next-line
  }, []);
};

const useBodyColor = (background = BG_IMAGE) => {
  const bodyRef = useRef(BODY_REF);
  const linkChecker = isLink(background);

  useEffect(() => {
    if (!linkChecker) {
      bodyRef.current.style.backgroundImage = "none";
      bodyRef.current.style.background = background;
    } else {
      bodyRef.current.style.background = "";
      bodyRef.current.style.backgroundRepeat = "no-repeat";
      bodyRef.current.style.backgroundSize = "cover";
      bodyRef.current.style.backgroundImage = `url(${background})`;
    }
  }, [background, linkChecker]);
};

export { useToggle, useOuterCLick, useBodyColor };
