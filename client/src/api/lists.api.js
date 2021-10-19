import { ErrorHandler } from "./error.api";
import { listsService } from "./feathers.api";

import { GET_LISTS } from "../utils/actions.types";
//import { NEW_LISTS_CREATED, LIST_DELETED } from "../utils/actions.types";

class List extends ErrorHandler {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const payload = await listsService.create(props);

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(payload);
        }
      });

      /*
      ? prev realization
      dispatch({
        type: NEW_LISTS_CREATED,
        payload,
      });
      */

      return payload;
    } catch (e) {
      console.log("create a list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  find = async (props, dispatch, ...callbacks) => {
    try {
      const { data } = await listsService.find({ query: { props } });

      callbacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(data);
        }
      });

      dispatch({
        type: GET_LISTS,
        payload: data,
      });

      return data;
    } catch (e) {
      console.log("find a list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  delete = async (id, dispatch) => {
    try {
      await listsService.remove({ _id: id });

      /*
      ? prev realization
      const deletedList = await listsService.remove({ _id: id });
      dispatch({
        type: LIST_DELETED,
        payload: deletedList._id,
      });
      */

      return new Promise((res) => res("done"));
    } catch (e) {
      console.log("delete list error", e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const list = new List();

export { list };
