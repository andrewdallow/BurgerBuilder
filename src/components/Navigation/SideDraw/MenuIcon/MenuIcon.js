import React from 'react';

import classes from './MenuIcon.css';

const menuIcon = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default menuIcon;
