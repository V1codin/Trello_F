import { connect } from "react-redux";

import { list } from "../../api/lists.api";

import moreDots from "../../assets/more.svg";
import "./List.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RowList(props) {
  const {
    dispatch,
    list: { name, _id },
  } = props;

  const moreBtn = () => {
    list.delete(_id, dispatch);
  };

  return (
    <>
      <section className="card_design list">
        <header className="popup__header list__header">
          <h3 className="list__heading unselectable">{name}</h3>
          <div className="list__btnSection">
            <button className="menu__btn more__btn" onClick={moreBtn}>
              <img src={moreDots} alt="more" className="menu__ico" />
            </button>
          </div>
        </header>
      </section>
    </>
  );
}

const List = connect(null, mapDispatchToProps)(RowList);

export { List };
