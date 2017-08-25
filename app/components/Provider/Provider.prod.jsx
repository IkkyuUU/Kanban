import React from 'react';
import AltContainer from 'alt-container';
import alt from '../../libs/alt';
import setup from './setup';

setup(alt);

export default ({children}) =>
  <AltContainer flux={alt}>
    {children}
  </AltContainer>;

  /*
  AltContainer will enable us to connect the data of our application at component level 
  when we implement connect.
  */