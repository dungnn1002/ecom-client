import React from "react";
import "./index.scss";
interface Props {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}
const ButtonShop: React.FC<Props> = ({ children, onClick, type }) => (
  <button className="cssButton" onClick={onClick} type={type}>
    {children}
  </button>
);

export default ButtonShop;
