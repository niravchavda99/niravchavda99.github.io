import './Shiny.scss'
import {ReactNode, useEffect, useRef} from "react";
import {onMouseMove, onMouseOut, onMouseOver, setShineSizeAndOffset} from "./ShinyUtils";
import ThemeValueProps from "../ThemeValueProps";

type ShinyProps = {
  children: ReactNode;
  size: number;
  color: string;
  classNames?: string;
} & ThemeValueProps;

const Shiny = ({children, size, color, classNames, theme}: ShinyProps) => {
  const shinyRef = useRef<any>(null);
  const classes = "shiny" + (classNames ? ` ${classNames}` : '');
  const opacity = theme === 'dark' ? 1 : 0.5;

  useEffect(() => {
    if (shinyRef) {
      const shiny = shinyRef.current;

      setShineSizeAndOffset(shiny, size);

      shiny.addEventListener("mouseover", onMouseOver(shiny, color, opacity));
      shiny.addEventListener("mousemove", onMouseMove(shiny));
      shiny.addEventListener("mouseout", onMouseOut(shiny));
    }
  }, [shinyRef, color, opacity, size]);

  return <div ref={shinyRef} className={classes}>{children}</div>;
};

export default Shiny;
