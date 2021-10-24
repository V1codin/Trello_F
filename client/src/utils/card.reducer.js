import {
  GET_LISTS_AND_CARDS,
  NEW_CARD_CREATED,
  CARD_DELETED,
} from "./actions.types";

import { isPropInObject } from "./helpers";

/*
{
  "listId" : [Array of cards]
}
*/

const init = {};

function card(state = init, { type, payload, cards }) {
  switch (type) {
    case CARD_DELETED:
      const deletedCardListId = payload.listId;
      const deletedId = payload._id;

      // ? switch case is bs cause of no creating scopes
      const isListOfDeletedCardInState = isPropInObject(
        deletedCardListId,
        state
      );

      if (isListOfDeletedCardInState) {
        return {
          ...state,
          [deletedCardListId]: state[deletedCardListId].filter(
            ({ _id }) => _id !== deletedId
          ),
        };
      }

      return { ...state };

    case NEW_CARD_CREATED:
      const cardCreatedListId = payload.listId;

      // ? switch case is bs cause of no creating scopes
      const isListOfCreatedCardInState = isPropInObject(
        cardCreatedListId,
        state
      );

      if (isListOfCreatedCardInState) {
        return {
          ...state,
          [cardCreatedListId]: [...state[cardCreatedListId], payload],
        };
      }
      return {
        ...state,
        [cardCreatedListId]: [payload],
      };

    case GET_LISTS_AND_CARDS:
      const additionalCards = cards.reduce((ac, card) => {
        const { listId } = card;

        if (listId in ac) {
          ac[listId].push(card);
        } else {
          ac[listId] = [card];
        }
        return ac;
      }, {});

      return {
        ...state,
        ...additionalCards,
      };
    default:
      return state;
  }
}

export { card };
