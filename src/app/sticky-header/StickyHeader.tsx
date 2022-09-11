import React from "react";
import './StickyHeader.scss';

const StickyHeader = () => {
  return <div className={'sticky-header'}>
    <a href={"/#about"} className={'sticky-header-content mobile-hidden'}>About</a>
    <a href={"/#experience"} className={'sticky-header-content mobile-hidden'}>Experience</a>
    <a href={"/#skills"} className={'sticky-header-content mobile-hidden'}>Skills</a>
    <a href={"/#activities"} className={'sticky-header-content mobile-hidden'}>Activities</a>
  </div>;
};

export default StickyHeader;
