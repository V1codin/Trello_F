import edit from "../../assets/edit.svg";
import "./Card.css";

function Card(props) {
  const {
    removeCard,
    card: { name },
  } = props;

  return (
    <>
      <section className="card">
        <span className="card__text">{name}</span>
        <button
          className="menu__btn edit__btn"
          title="Edit the card"
          onClick={removeCard}
        >
          <img src={edit} alt="edit" className="menu__ico edit__ico" />
        </button>
      </section>
    </>
  );
}

export { Card };
