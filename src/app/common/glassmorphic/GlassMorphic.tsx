import "./GlassMorphic.scss"
import React from "react";

interface GlassMorphicProps {
  fadeOpacity: number;
  children: React.ReactNode;
  classNames?: string;
}

export const GlassMorphic = ({fadeOpacity, children, classNames}: GlassMorphicProps) => {
  const classes = classNames ? " " + classNames : "";
  const style = {'--fade-opacity': fadeOpacity + '%'} as React.CSSProperties;

  return <div className={`glass-morphic${classes}`} style={style}>{children}</div>;
};
