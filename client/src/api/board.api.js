import { boardsService } from "./feathers.api";
import { NEW_BOARD_CREATED, BOARD_DELETED } from "../utils/actions.types";

const createBoard = async (props, dispatch, ...callbacks) => {
  try {
    const { form } = props;
    const payload = await boardsService.create(form);

    callbacks.forEach((cb) => {
      if (typeof cb === "function") {
        cb(payload);
      }
    });

    dispatch({
      type: NEW_BOARD_CREATED,
      payload,
    });

    return payload;
  } catch (e) {
    console.log("create a board error", e);
    throw e;
  }
};

const findBoards = async (props) => {
  try {
    const boards = await boardsService.find(props);

    return boards;
  } catch (e) {
    console.log("get boards error", e);
    throw e;
  }
};

const deleteBoard = async (props = "", dispatch, ...callbacks) => {
  try {
    const { _id } = await boardsService.remove(props);

    callbacks.forEach((cb) => {
      if (typeof cb === "function") {
        cb(_id);
      }
    });

    dispatch({
      type: BOARD_DELETED,
      payload: _id,
    });

    return new Promise((res) => res("done"));
  } catch (e) {
    throw e;
  }
};

export { createBoard, findBoards, deleteBoard };
