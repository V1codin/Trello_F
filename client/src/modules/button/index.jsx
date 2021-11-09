import PropTypes from "prop-types";

import { Process } from "../process";

import "./Button.css";

function Button(props) {
  const { submit, btnText, loading } = props;

  const progressStyles = {
    margin: 0,
    width: 35,
    height: 35,
  };

  return (
    <section
      className={`progress__btn__section ${props?.classList?.join(" ")}`}
    >
      <button
        className={`innerCreate__btn sec__btn card_design ${props?.btnClassList?.join(
          " "
        )}`}
        onClick={submit}
        disabled={loading}
      >
        {!loading ? (
          <span className="btn__span">{btnText}</span>
        ) : (
          <Process isShown={loading} styles={progressStyles} />
        )}
      </button>
    </section>
  );
}

Button.defaultProps = {
  submit: () => null,
  btnText: "Button",
  loading: false,
  classList: [],
  btnClassList: [],
};

Button.propTypes = {
  submit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string),
  btnClassList: PropTypes.arrayOf(PropTypes.string),
};

export { Button };
