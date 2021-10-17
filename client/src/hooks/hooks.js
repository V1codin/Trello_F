import { useCallback, useState, useEffect } from "react";
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
  const bodyRef = BODY_REF;
  const linkChecker = isLink(background);

  useEffect(() => {
    if (!linkChecker) {
      bodyRef.style.backgroundImage = "none";
      bodyRef.style.background = background;
    } else {
      bodyRef.style.background = "";
      bodyRef.style.backgroundRepeat = "no-repeat";
      bodyRef.style.backgroundSize = "cover";
      bodyRef.style.backgroundImage = `url(${background})`;
    }

    return () => {
      bodyRef.style.background = "";
      bodyRef.style.backgroundRepeat = "no-repeat";
      bodyRef.style.backgroundSize = "cover";
      bodyRef.style.backgroundImage = "";
    };
  }, [background, linkChecker, bodyRef]);
};

export { useToggle, useOuterCLick, useBodyColor };
