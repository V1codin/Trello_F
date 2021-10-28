import { useRef } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { list } from "../../api/list.api";
import { card } from "../../api/card.api";

import { CardComponent } from "../../views/CardComponent";
import { AddForm } from "./components/addForm";
import { ListDropDown } from "./components/dropdown";
import { Process } from "../../modules/process";

import "./List.css";

const mapStateToProps = (state, props) => {
  const {
    list: { _id },
  } = props;

  return {
    cards: state.cards[_id] || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const CardsIterator = (props) => {
  const { cards, deleteCard } = props;
  return cards.map((card) => (
    <CardComponent
      card={card}
      key={card._id}
      removeCard={deleteCard(card._id)}
    />
  ));
};

function RowList(props) {
  const {
    dispatch,
    list: { name, _id, boardId },
    cards,
  } = props;

  const cardRef = useRef(null);

  const deleteList = async () => {
    try {
      await list.delete(_id, dispatch);
    } catch (e) {
      console.log("delete list error", e);
    }
  };

  const deleteCard = (id) => async () => {
    try {
      await card.delete(id, dispatch);
    } catch (e) {
      console.log("card delete error /list component/", e);
    }
  };

  const deleteHandler = useAsyncCallback(deleteList);

  const deleteFn = (cb) => async () => {
    cb();
    await deleteHandler.execute();
  };

  return (
    <>
      <section className="card_design list" ref={cardRef}>
        {deleteHandler.loading ? (
          <Process isShown={deleteHandler.loading} />
        ) : (
          <>
            <header className="popup__header list__header">
              <h3 className="list__heading unselectable">{name}</h3>
              <ListDropDown parentRef={cardRef} deleteFn={deleteFn} />
            </header>

            <section className="list__body">
              <CardsIterator {...{ cards, deleteCard }} />
            </section>
            <section className="list__body">
              <AddForm {...{ _id, boardId }} />
            </section>
          </>
        )}
      </section>
    </>
  );
}

const List = connect(mapStateToProps, mapDispatchToProps)(RowList);

export { List };
