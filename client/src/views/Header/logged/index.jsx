import { Avatar } from "../../../modules/avatar";
import plusIco from "../../../assets/plus.svg";

function LoggedHeader(props) {
  const { imgLink, name } = props;
  return (
    <section className="userSection">
      <button className="userSection__btn">
        <img src={plusIco} alt="add board" className="plus__ico" />
      </button>
      <Avatar imgLink={imgLink} name={name} />
    </section>
  );
}

export { LoggedHeader };
