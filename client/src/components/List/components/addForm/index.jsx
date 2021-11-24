import AwesomeDebouncePromise from "awesome-debounce-promise";

import { memo } from "react";
import { useDispatch } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { useAddForm } from "../../../../hooks/hooks";
import { card } from "../../../../api/card.api";

import { FormWrapper } from "../../../../modules/formWrapper";
import { Button } from "../../../../modules/button";

import plus from "../../../../assets/plus.svg";

const FormBody = memo((props) => {
  const {
    inputPlaceholder,
    changeHandler,
    submit,
    closeFn,
    btnText,
    loading,
    btnClassList,
    classList,
  } = props;

  return (
    <>
      <input
        type="text"
        name="list_name"
        className="form__input add__list__input"
        placeholder={inputPlaceholder}
        onChange={changeHandler}
        autoFocus
      />
      <section className="add__list__btns">
        <Button {...{ submit, btnText, loading, btnClassList, classList }} />
        <Button {...{ type: "closeBtn", submit: closeFn }} />
      </section>
    </>
  );
});

function AddForm(props) {
  const { _id, boardId } = props;

  const { isAddForm, formToggle, changeHandler, formState } = useAddForm({
    className: "p_5",
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

  const debouncedRequest = AwesomeDebouncePromise(createCardsHandler, 1000);

  const { execute, loading } = useAsyncCallback(debouncedRequest);

  const bodyProps = {
    inputPlaceholder: "Enter a title for the card",
    changeHandler,
    submit: execute,
    closeFn: formToggle,
    btnText: "Add card",
    loading,
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
        <FormWrapper form={formState}>
          <FormBody {...bodyProps} />
        </FormWrapper>
      )}
    </section>
  );
}

export { AddForm };
