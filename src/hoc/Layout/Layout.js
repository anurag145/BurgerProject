import React,{Component} from "react";
import Helper from "../Helper/Helper"
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosed = ()=>{
         this.setState({showSideDrawer:false})
    }

    sideDrawerOpen =()=>{
        
        this.setState((prevState)=>{
         return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
   render(){
    return(  <Helper>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        menuClicked={this.sideDrawerOpen}/>
       <SideDrawer 
       isAuth={this.props.isAuthenticated}
       open={this.state.showSideDrawer}closed={this.sideDrawerClosed}/>
     <main className={classes.Content}>
         {this.props.children}
         </main>
         </Helper>
   )
   } 
}
const mapsStateToProps =(state)=>{
    return {
      isAuthenticated:state.auth.token!==null
    }
}
export default connect(mapsStateToProps)(Layout);