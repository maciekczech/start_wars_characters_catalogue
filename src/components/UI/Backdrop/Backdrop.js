import React from 'react'
import classes from './Backdrop.module.css'


const backdrop = props => {
    return (
        props.visible ? <div className={classes.Backdrop} onClick={props.hide} ></div> : null
    );
};

export default backdrop;