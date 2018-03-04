import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import classes from './Logo.css'
const logo = props=>{
return <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"></img>
    </div>
}
export default logo;