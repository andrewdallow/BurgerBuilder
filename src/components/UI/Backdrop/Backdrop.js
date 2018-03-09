import React from 'react';

import classes from './Backdrop.css';

const backdrop = props =>
  props.show ? (
    <div
      className={classes.Backdrop}
      onClick={props.clicked}
      onKeyPress={props.clicked}
      role="presentation"
    />
  ) : null;

export default backdrop;
