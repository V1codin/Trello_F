import { useDispatch } from "react-redux";

import { useAddForm } from "../../../../hooks/hooks";
import { list } from "../../../../api/list.api";

import { Form } from "../../../../modules/form";

import plus from "../../../../assets/plus.svg";

function AddForm(props) {
  const { _boardId } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: "add__list__form",
    name: "",
    boardId: _boardId,
  });

  const dispatch = useDispatch();

  const createListsHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (formState.name === "" || formState.name === " ") return;
    try {
      formToggle();
      //await list.create(formState, dispatch);
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
  );
}

export { AddForm };
