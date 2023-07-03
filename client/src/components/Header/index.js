import { Hamburger, PlusIcon } from "../../icons";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <Hamburger />
      <div>New chat</div>
      <PlusIcon />
    </div>
  );
};

export default Header;
