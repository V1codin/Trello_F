import { useState, useRef } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { list } from "../../api/lists.api";

import { ListDropDown } from "./ListDropdown";
import { Form } from "../../modules/form";
import { Process } from "../../modules/process";

import plus from "../../assets/plus.svg";
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

  const defState = {
    isDropDown: false,
  };

  const [state, setState] = useState(defState);
  const [addForm, setAddForm] = useState(false);
  const [form, setForm] = useState({
    className: "add__card__form",
    name: "",
    boardId: _id,
  });

  const cardRef = useRef(null);

  const formToggle = () => {
    setAddForm((prev) => !prev);
  };

  const deleteList = async () => {
    try {
      setState(defState);
      await list.delete(_id, dispatch);
    } catch (e) {
      console.log("delete list error", e);
    }
  };

  const { execute, loading } = useAsyncCallback(deleteList);

  const moreBtn = () => {
    setState({ ...state, isDropDown: !state.isDropDown });
  };

  const createCardsHandler = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (form.name === "" || form.name === " ") return;

    formToggle();
    console.log("create card");
  };

  const dropProps = {
    deleteList: execute,
    toggle: moreBtn,
    parentRef: cardRef,
  };

  const formProps = {
    type: "add_form",
    form,
    changeHandler: (e) => {
      const { value } = e.target;
      setForm({
        ...form,
        name: value,
      });
    },
    submit: createCardsHandler,
    closeFn: formToggle,
    addBtnTest: "Add card",
    inputPlaceholder: "Enter a title for the card",
  };

  return (
    <>
      <section className="card_design list" ref={cardRef} draggable>
        {loading ? (
          <Process isShown={loading} />
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

            <section className="list__body"></section>
            <section className="list__body">
              {!addForm ? (
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
        {state.isDropDown ? <ListDropDown {...dropProps} /> : null}
      </section>
    </>
  );
}

const List = connect(null, mapDispatchToProps)(RowList);

export { List };
