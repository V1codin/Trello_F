import closeIco from "../../assets/plus.svg";
import "./DropDown.css";

function DropDown(props) {
  const { toggle, heading, popupBody } = props;

  const containerClasses = `board_popup card_design ${props?.classList?.join(
    " "
  )}`;

  return (
    <section className={containerClasses}>
      <header className="popup__header">
        <h4 className="popup__article unselectable">{heading}</h4>
        <button className="close__btn" onClick={toggle}>
          <img
            src={closeIco}
            alt="close"
            className="menu__ico board__ico"
            title="Close the popup"
          />
        </button>
      </header>
      <ul className="popup__body body_shape">{popupBody}</ul>
    </section>
  );
}

export { DropDown };
