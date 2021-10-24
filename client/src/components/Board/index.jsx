import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAsync } from "react-async-hook";

import { useBodyColor, useAddForm } from "../../hooks/hooks";
import { list } from "../../api/list.api";
import { card } from "../../api/card.api";
import { GET_LISTS_AND_CARDS } from "../../utils/actions.types";

import { Process } from "../../modules/process";
import { List } from "../../views/List";
import { Form } from "../../modules/form";

import plus from "../../assets/plus.svg";
import "./Board.css";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    getBoardByID: (id) => state.boards.find((item) => item._id === id),
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const ListsIterator = (props) => {
  const { lists } = props;
  return lists.map((list) => <List key={list._id} list={list} />);
};

function RowBoard(props) {
  const {
    getBoardByID,
    dispatch,
    isLogged,
    lists,
    match: {
      params: { id },
    },
  } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: "add__list__form",
    name: "",
    boardId: id,
  });

  const { loading, result } = useAsync(
    async (id) => {
      try {
        const result = await Promise.all([list.find(id), card.find(id)]);
        return result;
      } catch (e) {
        throw e;
      }
    },
    [id, dispatch]
  );

  useEffect(() => {
    if (result) {
      const [lists, cards] = result;

      dispatch({
        type: GET_LISTS_AND_CARDS,
        lists,
        cards,
      });
    }
  }, [result, dispatch]);

  const board = getBoardByID(id);
  useBodyColor(board?.bg);

  if (board === undefined || !isLogged) return <Redirect to="/" />;

  const createListsHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (formState.name === "" || formState.name === " ") return;
    try {
      formToggle();
      await list.create(formState, dispatch);
    } catch (e) {
      console.log("create lists error", e);
    }
  };

  const formProps = {
    type: "add_form",
    form: formState,
    changeHandler,
    submit: createListsHandler,
    closeFn: formToggle,
    addBtnTest: "Add list",
    inputPlaceholder: "Enter list title",
  };

  return (
    <div className="container">
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <ListsIterator lists={lists.filter(({ boardId }) => boardId === id)} />
      )}

      <section className={isAddForm ? "add__form" : "add__form_wd"}>
        {!isAddForm ? (
          <button className="add__toggler card_design" onClick={formToggle}>
            <img
              src={plus}
              alt="add"
              className="menu__ico"
              title="add the list"
            />
            Add another list
          </button>
        ) : (
          <Form {...formProps} />
        )}
      </section>
    </div>
  );
}

const Board = connect(mapStateToProps, mapDispatchToProps)(RowBoard);

export { Board };
