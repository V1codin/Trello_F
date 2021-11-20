import React from "react";
import PropTypes from "prop-types";

import { ErrorBlock } from "../error";
import { Process } from "../process";

function FormWrapper(props) {
  const { children, form, error, loading } = props;

  const formClasses =
    form?.className !== ""
      ? `form card_design ${form.className}`
      : "form card_design";

  const customBgStyle =
    props?.form?.bg !== ""
      ? {
          backgroundColor: props?.form?.bg,
        }
      : props.form.link !== ""
      ? {
          backgroundImage: `url(${props.form.link})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : null;

  return (
    <form
      className={formClasses}
      style={customBgStyle}
      // ? for firefox (AwesomeDebouncePromise doesn't fire preventDefault in firefox)
      onSubmit={(e) => {
        e.preventDefault();
      }}
      {...props?.containerAttrs}
    >
      {error ? <ErrorBlock {...error} /> : null}
      {loading ? <Process isShown={loading} /> : children}
    </form>
  );
}

FormWrapper.defaultProps = {
  children: {},
};
FormWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  containerAttrs: PropTypes.any,
  form: PropTypes.object.isRequired,
};
export { FormWrapper };
