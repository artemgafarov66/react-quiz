import React from 'react';
import classes from './Loader.scss';

const Loader = props => {
  return (
    <div className={classes.LoaderContainer}>
      <div className={classes.Loader}>
        <div/><div/><div/><div/><div/><div/><div/><div/>
      </div>
    </div>
  );
};

export default Loader;
