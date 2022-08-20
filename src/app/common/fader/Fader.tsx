import {ReactNode, useState} from "react";

type FaderProps = {
  children: ReactNode,
  timeout: number,
  transitionTime: number,
  type?: string,
  classes?: string
}

const getFadeStyle = (type: string, transitionTime: number) => {
  if (type === 'out') {
    return {
      opacity: 0,
      transition: `opacity ${transitionTime}s ease-in-out`
    };
  }

  return {
    opacity: 1,
    transition: `opacity ${transitionTime}s ease-in-out`
  };
};

const getDefaultClasses = (type: string) => {
  if (type === 'out') {
    return 'opacity-1';
  }

  return 'opacity-0';
}

const Fader = ({children, timeout, transitionTime, type = 'in', classes}: FaderProps) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const fadeStyle = getFadeStyle(type, transitionTime);
    setStyle(fadeStyle);
  }, timeout);

  const defaultClasses = getDefaultClasses(type);

  return <div style={style} className={`${defaultClasses} ${classes}`}>{children}</div>;
};

export default Fader;