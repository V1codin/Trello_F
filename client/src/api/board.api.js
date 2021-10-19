import { ErrorHandler } from "./error.api";
import { boardsService } from "./feathers.api";
//import { NEW_BOARD_CREATED, BOARD_DELETED } from "../utils/actions.types";

class Board extends ErrorHandler {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const { form } = props;
      const payload = await boardsService.create(form);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(payload);
        }
      });

      /*
      ? prev realization
      dispatch({
        type: NEW_BOARD_CREATED,
        payload,
      });
      */

      return payload;
    } catch (e) {
      console.log("create a board error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  find = async (props = {}) => {
    try {
      const boards = await boardsService.find(props);

      return boards;
    } catch (e) {
      console.log("find boards error", e);
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };

  delete = async (props = "", dispatch, ...callbacks) => {
    try {
      const { _id } = await boardsService.remove(props);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(_id);
        }
      });

      /*
      ? prev realization
      dispatch({
        type: BOARD_DELETED,
        payload: _id,
      });
      */

      return new Promise((res) => res("done"));
    } catch (e) {
      console.log("delete a board error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const board = new Board();

export { board };
