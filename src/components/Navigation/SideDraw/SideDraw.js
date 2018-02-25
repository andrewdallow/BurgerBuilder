import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavagationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDraw.css';

const sideDraw = (props) => {
  let attachedClasses = [classes.SideDraw, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.SideDraw, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
}

export default sideDraw;
