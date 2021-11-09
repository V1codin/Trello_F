import PropTypes from "prop-types";

import { memo } from "react";

import { FormInputs } from "./forms";
import { ErrorBlock } from "../error";

import "./Form.css";

const Form = memo((props) => {
  const { type, heading, form, changeHandler, submit, ...res } = props;

  const formProps = {
    type,
    heading,
    state: form,
    warns: props?.warn,
    changeHandler,
    submit,
    ...res,
  };

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
    <>
      <form
        className={formClasses}
        style={customBgStyle}
        {...props?.containerAttrs}
      >
        {res.error ? <ErrorBlock {...res.error} /> : null}
        <FormInputs {...formProps} />
      </form>
    </>
  );
});

Form.defaultProps = {
  type: "",
  heading: "",
  btnText: "Button",
  form: { className: "", bg: "", link: "" },
  changeHandler: () => null,
  submit: () => null,
};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.object,
  warn: PropTypes.objectOf(PropTypes.string),
  btnText: PropTypes.string,

  containerAttrs: PropTypes.any,
};

export { Form };
