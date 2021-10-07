// * for key values
// * import { Children } from "react";
import { connect } from "react-redux";

import { useBodyColor } from "../../hooks/hooks";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getBoardByID: (id) => state.boards.find((item) => item._id === id),
  };
};

function RowBoard(props) {
  const {
    getBoardByID,
    match: {
      params: { id },
    },
  } = props;

  const board = getBoardByID(id);

  useBodyColor(board?.bg);

  if (board === undefined) return <Redirect to="/" />;

  return <div className="container"></div>;
}

const Board = connect(mapStateToProps, null)(RowBoard);

export { Board };
