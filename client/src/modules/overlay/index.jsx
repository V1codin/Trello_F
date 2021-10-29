import "./Overlay.css";

function Overlay(props) {
  const { renderBody } = props;
  return (
    <section className={`overlay ${props?.classList?.join(" ")}`}>
      {renderBody()}
    </section>
  );
}

export { Overlay };
