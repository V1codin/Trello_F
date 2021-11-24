import PropTypes from "prop-types";
import { memo } from "react";

import { Process } from "../process";
import plus from "../../assets/plus.svg";

import "./Button.css";

const CloseBtn = memo((props) => {
  const { closeFn } = props;
  return (
    <button className="close__btn btn_static btn_ml10" onClick={closeFn}>
      <img
        src={plus}
        alt="close"
        className="board__ico"
        title="close"
        draggable={false}
      />
    </button>
  );
});

function Button(props) {
  const { submit, btnText, loading, type } = props;

  if (type === "closeBtn") return <CloseBtn closeFn={submit} />;

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

  type: "btn",
};

Button.propTypes = {
  submit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string),
  btnClassList: PropTypes.arrayOf(PropTypes.string),

  type: PropTypes.string.isRequired,
};

export { Button };
