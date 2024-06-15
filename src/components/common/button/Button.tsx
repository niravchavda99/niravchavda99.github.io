import { ReactNode } from "react";
import "./Button.scss";

type ButtonVariant = "primary" | "danger";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
}

export const Button = ({ children, variant, onClick }: ButtonProps) => {
  const classNames = ["button", `button-${variant ?? "primary"}`].join(" ");
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
