import React from "react";
import "../css/ButtonPrincipal.css";

interface ButtonPrincipalProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
}

const ButtonPrincipal: React.FC<ButtonPrincipalProps> = ({
  text,
  onClick,
  icon,
  disabled = false,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-principal button-principal-${variant}`}
    >
      {icon && <span className="button-principal-icon">{icon}</span>}
      <span className="button-principal-text">{text}</span>
    </button>
  );
};

export default ButtonPrincipal;
