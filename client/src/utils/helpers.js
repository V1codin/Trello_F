import { boardsService, listsService, cardsService } from "../api/feathers.api";
import {
  NEW_BOARD_CREATED,
  BOARD_DELETED,
  NEW_LIST_CREATED,
  LIST_DELETED,
  CARD_DELETED,
  NEW_CARD_CREATED,
} from "../utils/actions.types";

const isLink = (background) => {
  return /\/{1,}/g.test(background);
};

const isImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => resolve(src);

    img.onerror = (e) => {
      reject({ error: true, message: "Your link has no image" });
    };
  });
};

const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return "";
    const result = await isImage(link);
    return result;
  } catch (e) {
    console.log("clipboard error", e);
    return "";
  }
};

const isPropInObject = (prop, obj) => prop in obj;

const addListenersForServerChanges = (store) => {
  //? events for updating data in case of duplicated login

  boardsService.on("created", (payload) => {
    store.dispatch({
      type: NEW_BOARD_CREATED,
      payload,
    });
  });

  boardsService.on("removed", ({ _id }) => {
    store.dispatch({
      type: BOARD_DELETED,
      payload: _id,
    });
  });

  listsService.on("created", (payload) => {
    store.dispatch({
      type: NEW_LIST_CREATED,
      payload,
    });
  });

  listsService.on("removed", ({ _id }) => {
    store.dispatch({
      type: LIST_DELETED,
      payload: _id,
    });
  });

  /*
  TODO suggestion
  ? get a new card/list 
  ? for every changed data (action type GET_LISTS/GET_CARDS)
  ? instead of
  */

  cardsService.on("removed", ({ _id, listId }) => {
    store.dispatch({
      type: CARD_DELETED,
      payload: { _id, listId },
    });
  });

  cardsService.on("created", (payload) => {
    store.dispatch({
      type: NEW_CARD_CREATED,
      payload,
    });
  });
};

export {
  isLink,
  getDataFromClipBoard,
  isPropInObject,
  addListenersForServerChanges,
};
