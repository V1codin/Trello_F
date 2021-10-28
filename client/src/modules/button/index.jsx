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
    <section className="progress__btn__section">
      <button
        className="innerCreate__btn sec__btn card_design"
        onClick={submit}
        disabled={loading}
      >
        {!loading ? (
          <span className="btn__span">{btnText || ""}</span>
        ) : (
          <Process isShown={loading} styles={progressStyles} />
        )}
      </button>
    </section>
  );
}

export { Button };
