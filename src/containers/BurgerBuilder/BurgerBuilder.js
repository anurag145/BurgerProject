import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Helper from "../../hoc/Helper/Helper";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';


class BurgerBuilder extends Component{
   state={
     
     purchaseable:false,
     purchasing:false,
     
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }

    
    updatePurchaseState(ingredients){
       

        const sum =Object.keys(ingredients).map((igkey)=>{
              return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
       return sum>0;
    }
     purchaseHandler=()=>{
         
         this.setState({purchasing: true});
     }
     purchaseCancelHandler = () =>{
         this.setState({purchasing:false});
     }

     purchaseContinueHandler=()=>{
        //  const queryParams=[];
        //  for(let i in this.state.ingredients )
        //  {
        //      queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        //  }
        //  queryParams.push('price='+this.state.totalPrice);
        //  const queryString=queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout'
            //search:'?'+queryString
        });
     }

    render()
    {
        const disabledInfo= {...this.props.ings};
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key] ===0
        }
        let burger = this.props.error?<p style={{textAlign:'center', margin:'250px'}}>Oops! something is not right!</p>:<Spinner/>;
        let orderSummary=null;
        if(this.props.ings)
        {
         burger= [<Burger key={Burger} ingredients={this.props.ings}/>,
            <BuildControls key={BuildControls}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={this.updatePurchaseState(this.props.ings)}
        price={this.props.totalPrice}/>];

        orderSummary=
            <OrderSummary 
            price={this.props.totalPrice}
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
         }
           
            return(
            
            
            <Helper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
               {burger}
            </Helper>
                )
    }
}

const mapsStateToProps= state=>{
return{
ings: state.burgerBuilder.ingredients,
totalPrice:state.burgerBuilder.totalPrice,
error:state.burgerBuilder.error
};
}
const mapsDispatchToProps=dispatch=> {
return{
    onIngredientAdded: (ingredientName)=>dispatch(actions.addIngredients( ingredientName)),
    onIngredientRemoved: (ingredientName)=>dispatch(actions.removeIngredients(ingredientName)),
    onInitIngredients: ()=>dispatch(actions.initIngredients()),
    onInitPurchase:()=>dispatch(actions.purchaseInit())
};
}

export default connect(mapsStateToProps,mapsDispatchToProps)(withErrorHandler(BurgerBuilder,axios));