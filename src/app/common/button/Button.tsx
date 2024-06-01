import {ReactNode} from "react";
import './Button.scss';

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export const Button = ({children, onClick}: ButtonProps) => {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}