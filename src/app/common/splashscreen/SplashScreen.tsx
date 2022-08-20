import Fader from "../fader/Fader";
import {TbLetterN} from "react-icons/tb";
import React from "react";
import './SplashScreen.scss';

const SplashScreen = () => {
  return (
      <div className={'loading overflow-hidden'}>
        <Fader type={'out'} timeout={1000} transitionTime={1}
               classes={'flex flex-col justify-center items-center'}>
          <TbLetterN className={'letter-n'} size={144}/>
        </Fader>
      </div>
  );
};

export default SplashScreen;