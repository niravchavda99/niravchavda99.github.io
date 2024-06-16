import { ReactNode } from "react";
import "./Button.scss";

type ButtonVariant = "primary" | "danger";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant,
  onClick,
  disabled,
}: ButtonProps) => {
  const classNames = [
    "button",
    `button-${variant ?? "primary"}`,
    disabled && "button-disabled",
  ].join(" ");
  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
