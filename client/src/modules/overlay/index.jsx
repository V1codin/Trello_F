import PropTypes from "prop-types";

import "./Overlay.css";

function Overlay(props) {
  const { renderBody } = props;
  return (
    <section className={`overlay ${props?.classList?.join(" ")}`}>
      {renderBody()}
    </section>
  );
}

Overlay.defaultProps = {
  renderBody: () => null,
  classList: [],
};

Overlay.propTypes = {
  renderBody: PropTypes.func.isRequired,
  classList: PropTypes.arrayOf(PropTypes.string),
};

export { Overlay };
