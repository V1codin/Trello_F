import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAsyncCallback } from "react-async-hook";
import { board } from "../../api/board.api";

import { Process } from "../../modules/process";

function BoardCard(props) {
  const { _id, bg, deleteIco, title, bgChecker, dispatch } = props;
  const navLinkRef = useRef(null);

  const deleteBoardHandler = async (e) => {
    try {
      const { name } = e.target;
      await board.delete(name, dispatch);
    } catch (e) {
      console.log("delete board card err ", e);
    }
  };

  const { execute, loading } = useAsyncCallback(deleteBoardHandler);

  const boardRedirect = (e) => {
    navLinkRef.current.click();
  };

  return loading ? (
    <div className="board__card card_design">
      <Process isShown={loading} />
    </div>
  ) : (
    <div
      className="board__card card_design"
      name={_id}
      style={
        bgChecker
          ? {
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : { background: bg }
      }
      title={title}
    >
      <NavLink to={`/board/${_id}`} ref={navLinkRef} hidden></NavLink>
      <button className="close__btn" onClick={execute} name={_id}>
        <img
          src={deleteIco}
          name={_id}
          alt="delete"
          className="menu__ico board__ico"
          title="Delete the board"
        />
      </button>
      <button
        className="form__btn card__btn"
        title="Go to the board"
        onClick={boardRedirect}
      >
        {title}
      </button>
    </div>
  );
}

export { BoardCard };
