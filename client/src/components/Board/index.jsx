import { useState, Children } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAsync } from "react-async-hook";

import { useBodyColor } from "../../hooks/hooks";
import { list } from "../../api/lists.api";

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
  return Children.toArray(lists.map((list) => <List list={list} />));
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

  const [addForm, setAddForm] = useState(false);
  const [form, setForm] = useState({
    className: "add__list__form",
    name: "",
  });

  const { loading } = useAsync(list.find, [id, dispatch]);

  const formToggle = () => {
    setAddForm((prev) => !prev);
  };

  const board = getBoardByID(id);
  useBodyColor(board?.bg);

  if (board === undefined || !isLogged) return <Redirect to="/" />;

  const createListsHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (form.name === "" || form.name === " ") return;
    try {
      await list.create(form, dispatch);
      formToggle();
    } catch (e) {
      console.log("create lists error", e);
    }
  };

  const formProps = {
    type: "add_list",
    form,
    changeHandler: (e) => {
      const { value } = e.target;
      setForm({
        ...form,
        name: value,
      });
    },
    submit: createListsHandler,
    closeFn: formToggle,
  };

  return (
    <div className="container">
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <ListsIterator lists={lists} />
      )}

      <section className={addForm ? "add__form" : "add__form_wd"}>
        {!addForm ? (
          <button className="add__toggler card_design" onClick={formToggle}>
            <img
              src={plus}
              alt="add"
              className="menu__ico"
              title="add the list"
            />
            Add another list
          </button>
        ) : null}
        {addForm ? <Form {...formProps} /> : null}
      </section>
    </div>
  );
}

const Board = connect(mapStateToProps, mapDispatchToProps)(RowBoard);

export { Board };
