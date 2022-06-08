import { useState, useRef, useCallback } from 'react';

import { card } from '../../api/card.api';

import { EditSection } from './EditSection';

import edit from '../../assets/edit.svg';

import './Card.css';

function Card(props) {
  const {
    removeCard,
    card: { name, _id }
  } = props;

  const [isOverlay, setOverlay] = useState(false);
  const spanRef = useRef(null);

  const patchCard = useCallback(
    async (newName) => {
      try {
        const patchedCard = await card.patch(
          { ...props.card, name: newName },
          _id
        );
        setOverlay(false);

        return patchedCard;
      } catch (e) {
        console.log('card edit error', e);
      }
    },
    [props.card, _id]
  );

  const textAreaHeight = spanRef?.current?.scrollHeight + 20;

  const toggleOverlay = () => {
    setOverlay((prev) => !prev);
  };

  const editProps = {
    textAreaHeight,
    name,
    toggleOverlay,
    removeCard,
    patchCard
  };

  return (
    <>
      <div className="card">
        {isOverlay ? (
          <>
            <EditSection {...editProps} />
          </>
        ) : (
          <>
            <span className="card__text unselectable" ref={spanRef}>
              {name}
            </span>
            <button
              className="menu__btn edit__btn"
              title="Edit the card"
              onClick={toggleOverlay}
            >
              <img src={edit} alt="edit" className="menu__ico edit__ico" />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export { Card };
