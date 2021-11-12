import { boardsService, listsService, cardsService } from "../api/feathers.api";
import {
  NEW_BOARD_CREATED,
  BOARD_DELETED,
  NEW_LIST_CREATED,
  LIST_DELETED,
  CARD_DELETED,
  NEW_CARD_CREATED,
  CARD_PATCHED,
} from "../utils/actions.types";

const isLink = (background) => {
  //return /\/{1,}/g.test(background);
  return /^https:\/\/images\.unsplash\.com\/.{1,}/g.test(background);
};

const isImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => resolve(src);

    img.onerror = (e) => {
      reject("Your link has no image");
    };
  });
};

const getDataFromClipBoard = async () => {
  try {
    const link = await navigator.clipboard.readText();
    if (!isLink(link)) return Promise.reject("Your link has no image");

    const result = await isImage(link);
    return result;
  } catch (e) {
    console.log("e: ", e);
    throw e;
  }
};

const isPropInObject = (prop, obj) => prop in obj;

const addListenersForServerChanges = (dispatch) => {
  // ? if on the server delete  app.channel(user.email).join(connection);
  // ? and app.publish("created" , () => {})
  // ? that would cause to re render after any creation of any user

  // ? events for updating data in case of subscription

  boardsService.on("created", (payload) => {
    dispatch({
      type: NEW_BOARD_CREATED,
      payload,
    });
  });

  boardsService.on("removed", ({ _id }) => {
    dispatch({
      type: BOARD_DELETED,
      payload: _id,
    });
  });

  listsService.on("created", (payload) => {
    dispatch({
      type: NEW_LIST_CREATED,
      payload,
    });
  });

  listsService.on("removed", ({ _id }) => {
    dispatch({
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
    dispatch({
      type: CARD_DELETED,
      payload: { _id, listId },
    });
  });

  cardsService.on("created", (payload) => {
    dispatch({
      type: NEW_CARD_CREATED,
      payload,
    });
  });

  cardsService.on("patched", (payload) => {
    dispatch({
      type: CARD_PATCHED,
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
