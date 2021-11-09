import AwesomeDebouncePromise from "awesome-debounce-promise";

import { useDispatch } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

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
      await list.create(formState, dispatch);
      formToggle();
    } catch (e) {
      console.log("create lists error", e);
    }
  };

  const debouncedRequest = AwesomeDebouncePromise(createListsHandler, 1000);

  const { execute, loading } = useAsyncCallback(debouncedRequest);

  const formProps = {
    type: "add_form",
    form: formState,
    changeHandler,
    submit: execute,
    closeFn: formToggle,
    loading,
    btnText: "Add list",
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
