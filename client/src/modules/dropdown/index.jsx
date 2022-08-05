import PropTypes from 'prop-types';

import closeIco from '../../assets/plus.svg';
import './DropDown.css';

function DropDown(props) {
  const { toggle, heading, popupBody } = props;

  return (
    <section className={`board_popup card_design ${props.classList?.join(' ')}`}>
      <header className="popup__header">
        <h4 className="popup__article unselectable">{heading}</h4>
        <button className="close__btn" onClick={toggle}>
          <img
            src={closeIco}
            alt="close"
            className="menu__ico board__ico"
            title="Close the dropdown"
            draggable={false}
          />
        </button>
      </header>
      {popupBody && <ul className="popup__body body_shape">{popupBody}</ul>}
    </section>
  );
}

DropDown.defaultProps = {
  toggle: () => null,
  heading: 'Heading',
  popupBody: null,
  classList: []
};

DropDown.propTypes = {
  toggle: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  popupBody: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  classList: PropTypes.arrayOf(PropTypes.string)
};

export { DropDown };
