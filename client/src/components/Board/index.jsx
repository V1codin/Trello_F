import { ListsWrapper } from './components/lists';
import { AddForm } from './components/addForm';
import { BoardHeader } from './components/boardHeader';

import './Board.css';

function Board(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  return (
    <section className="boards">
      <BoardHeader _boardId={id} />

      <div className="container">
        <ListsWrapper _boardId={id} />
        <AddForm _boardId={id} />
      </div>
    </section>
  );
}

export { Board };
