import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import {connect}from 'react-redux';


class Checkout extends Component{
    
   
    // componentWillMount(){
    //     const query= new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let Price=0;
    //     for(let param of query.entries())
    //     {
    //         if(param[0]==='price')
    //         {
    //           Price=+param[1]
    //         }else{
    //         ingredients[param[0]]=+param[1]
    //     }
    // }
    //     this.setState({ingredients:ingredients,Price:Price})
    // }
checkoutCancelledHandler=()=>{
 this.props.history.goBack();
}
checkoutContinuedHandler=()=>{
 this.props.history.replace('checkout/contact-data');
}
render(){
    let summary =<Redirect to ="/"/>
    
    if(this.props.ings){
        const purchasedRedirect = this.props.purchased? <Redirect to='/'/>: null;
        summary =(
            
            <div>
                {purchasedRedirect}
        <CheckoutSummary 
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
        /> 
        <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
        />
        </div>
    )
    }
    return(
        
           summary
           
        
    )
}
  
}
const mapStatetoProps= state=>{
return{
    ings:state.burgerBuilder.ingredients,
    purchased:state.order.purchased
}
};




export default connect(mapStatetoProps)(Checkout);