import React from 'react';
import classes from './Modal.css';
import Helper from '../../../hoc/Helper';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props)=>(
    <Helper>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div className={classes.Modal}
    style={{
        transform : props.show? 'translateY(0)': 'translateY(-100vh)',
        opacity: props.show? '1':'0'
    }}
    >
        {props.children}
    </div>
    </Helper>
);

export default modal;