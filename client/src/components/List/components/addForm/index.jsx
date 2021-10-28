import { useDispatch } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { useAddForm } from "../../../../hooks/hooks";
import { card } from "../../../../api/card.api";

import { Form } from "../../../../modules/form";

import plus from "../../../../assets/plus.svg";

function AddForm(props) {
  const { _id, boardId } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: "add__card__form",
    name: "",
    listId: _id,
    boardId,
  });

  const dispatch = useDispatch();

  const createCardsHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (formState.name === "" || formState.name === " ") return;

    try {
      await card.create(formState, dispatch);
      formToggle();
    } catch (e) {
      console.log("create card error", e);
      throw e;
    }
  };

  const { execute, loading } = useAsyncCallback(createCardsHandler);

  const formProps = {
    type: "add_form",
    form: formState,
    changeHandler,
    submit: execute,
    loading,
    closeFn: formToggle,
    btnText: "Add card",
    inputPlaceholder: "Enter a title for the card",
  };

  return (
    <section className="list__body">
      {!isAddForm ? (
        <button className="add__toggler card_design" onClick={formToggle}>
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
  );
}

export { AddForm };
