import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { auth } from '../../../../api/auth.api';

import { Invite } from './invite';
import { Avatar } from '../../../../modules/avatar';

import ownerIco from '../../../../assets/owner.svg';

const mapStateToProps = (state, props) => {
  const { _boardId } = props;
  const localBoard = state.boards.find((item) => item._id === _boardId) || {};
  const currentUser = state.auth.user._id;

  return {
    localBoard,
    currentUser
  };
};

const SubscribersSection = (props) => {
  const { subs, ownerId } = props;

  return (
    <section className="subsSection">
      {/* 
      // ? destructuring in arguments only for not writing {}
       */}
      {subs.map(({ _id, imageURL, displayName }) =>
        _id === ownerId ? (
          <section className="avatar__container" key={_id}>
            <Avatar
              imgLink={imageURL}
              name={`${displayName} owner`}
              size={25}
            />
            <img src={ownerIco} className="avatar__ico" alt="owner" />
          </section>
        ) : (
          <Avatar key={_id} imgLink={imageURL} name={displayName} size={25} />
        )
      )}
    </section>
  );
};

function RowBoardHeader(props) {
  const {
    currentUser,
    localBoard,
    localBoard: { title, memberIds, ownerId, _id }
  } = props;

  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (memberIds && ownerId) {
      auth.getBoardMembersInfo([ownerId, ...memberIds], (data) => {
        setSubs((prev) => [...data, ...prev]);
      });
    }

    return () => setSubs([]);

    // eslint-disable-next-line
  }, [memberIds]);

  if (!localBoard) return null;

  return (
    <section className="boards__header">
      <div className="header__wrapper card_design">
        <h4 className="unselectable" title="Board name">
          {title}
        </h4>
        <span className="span_divider"></span>
        <SubscribersSection subs={subs} ownerId={ownerId} />
        <span className="span_divider"></span>
        {currentUser === ownerId ? (
          <Invite ownerId={ownerId} boardId={_id} />
        ) : null}
      </div>
    </section>
  );
}

const BoardHeader = connect(mapStateToProps, null)(RowBoardHeader);

export { BoardHeader };
