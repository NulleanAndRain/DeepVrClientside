import { NavLink } from "react-router-dom";
import "../../../App.css";

interface FooterMenuButtonProps {
  icon: string;
  text: string;
  linkTo: string;
}

export const FooterMenuButton: React.FC<FooterMenuButtonProps> = ({
  icon,
  text,
  linkTo,
}) => {
  return (
    <NavLink to={linkTo}>
      {({ isActive }) => (
        <>
          <img src={icon} alt={text} />
          <div className="footer-menu-text">{text}</div>
          {isActive && <div className="footer-menu-selected-link" />}
        </>
      )}
    </NavLink>
  );
};
