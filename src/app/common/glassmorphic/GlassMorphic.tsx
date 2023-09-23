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

const getBackground = (mode: 'dark' | 'light', fadeOpacity: number): string => {
  const color = mode == 'dark' ? '#000' : '#fff';
  const opacity = fadeOpacity + "%";
  return `linear-gradient(120deg, rgba(${color}, ${opacity}), rgba(${color}, ${opacity}))`;
}