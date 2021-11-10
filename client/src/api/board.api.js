import { Service } from "./service.api";
import { boardsService } from "./feathers.api";
//import { NEW_BOARD_CREATED, BOARD_DELETED } from "../utils/actions.types";

class Board extends Service {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const { form } = props;
      const payload = await boardsService.create(form);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(payload);
        }
      });

      return payload;
    } catch (e) {
      console.log("create a board error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  find = async (props = {}, ...callbacks) => {
    try {
      const boards = await boardsService.find(props);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(boards);
        }
      });

      return boards;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      console.log("find boards error", errorFromHandler);
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
