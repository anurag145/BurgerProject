import React from "react";
import Helper from "../../hoc/Helper"
import classes from './Layout.css'
const layout = (props) =>{
 return(  <Helper>
  <div>Toolbar,SideDrawer,Backdrop</div>
  <main className={classes.Content}>
      {props.children}
      </main>
      </Helper>
)
};

export default layout;