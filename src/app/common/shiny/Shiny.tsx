import './Shiny.scss'
import {ReactNode, useEffect, useRef} from "react";
import {onMouseMove, onMouseOut, onMouseOver, setShineSizeAndOffset} from "./ShinyUtils";

type ShinyProps = {
  children: ReactNode;
  size: number;
  color: string;
  opacity: number;
  classNames?: string;
};

const Shiny = ({children, size, color, opacity, classNames}: ShinyProps) => {
  const shinyRef = useRef<any>(null);
  const classes = "shiny" + (classNames ? ` ${classNames}` : '');

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
