import { useState, useRef } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { list } from "../../api/list.api";
import { card } from "../../api/card.api";
import { useAddForm } from "../../hooks/hooks";

import { CardComponent } from "../CardComponent";
import { ListDropDown } from "./ListDropdown";
import { Form } from "../../modules/form";
import { Process } from "../../modules/process";

import plus from "../../assets/plus.svg";
import moreDots from "../../assets/more.svg";
import "./List.css";

const mapStateToProps = (state) => {
  return {
    cards: state.card,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const CardsIterator = (props) => {
  const { cards, id, deleteCard } = props;
  if (id in cards)
    return cards[id].map((card) => (
      <CardComponent
        card={card}
        key={card._id}
        removeCard={deleteCard(card._id)}
      />
    ));

  return null;
};

function RowList(props) {
  const {
    dispatch,
    list: { name, _id, boardId },
    cards,
  } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: "add__card__form",
    name: "",
    listId: _id,
    boardId,
  });

  const [isDropDown, setDropDown] = useState(false);

  const cardRef = useRef(null);

  const deleteList = async () => {
    try {
      setDropDown(false);
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

  const createCardsHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (formState.name === "" || formState.name === " ") return;

    try {
      formToggle();

      await card.create(formState, dispatch);
    } catch (e) {
      console.log("create card error", e);
      throw e;
    }
  };

  const deleteHandler = useAsyncCallback(deleteList);
  const addCardHandler = useAsyncCallback(createCardsHandler);

  const moreBtn = () => {
    setDropDown((prev) => !prev);
  };

  const dropProps = {
    deleteList: deleteHandler.execute,
    toggle: moreBtn,
    parentRef: cardRef,
  };

  const formProps = {
    type: "add_form",
    form: formState,
    changeHandler,
    submit: addCardHandler.execute,
    closeFn: formToggle,
    addBtnTest: "Add card",
    inputPlaceholder: "Enter a title for the card",
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
              <div className="list__btnSection">
                <button className="menu__btn more__btn" onClick={moreBtn}>
                  <img src={moreDots} alt="more" className="menu__ico" />
                </button>
              </div>
            </header>

            <section className="list__body">
              <CardsIterator {...{ cards, id: _id, deleteCard }} />
            </section>
            <section className="list__body">
              {!isAddForm ? (
                <button
                  className="add__toggler card_design"
                  onClick={formToggle}
                >
                  <img
                    src={plus}
                    alt="add"
                    className="menu__ico"
                    title="add the card"
                  />
                  Add another card
                </button>
              ) : (
                <Form {...formProps} />
              )}
            </section>
          </>
        )}
        {isDropDown ? <ListDropDown {...dropProps} /> : null}
      </section>
    </>
  );
}

const List = connect(mapStateToProps, mapDispatchToProps)(RowList);

export { List };
