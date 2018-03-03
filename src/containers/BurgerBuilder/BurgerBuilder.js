import React,{Component} from 'react';
import Helper from "../../hoc/Helper";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{
   state={
     ingredients :{
         salad:0,
         bacon:0,
         cheese:0,
         meat:0
     },
     totalPrice: 4,
     purchaseable:false,
     purchasing:false
    }
    updatePurchaseState(ingredients){
       

        const sum =Object.keys(ingredients).map((igkey)=>{
              return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
        this.setState({purchaseable: sum>0})
    }
     purchaseHandler=()=>{
         
         this.setState({purchasing: true});
     }
     purchaseCancelHandler = () =>{
         this.setState({purchasing:false});
     }

     purchaseContinueHandler=()=>{
         alert('You Continue');
     }
   addIngredientHandler = (type) =>{
       const oldCount =this.state.ingredients[type];
       const updatedCounted =oldCount+1;
       const updatedIngredients ={
           ...this.state.ingredients
       };
       updatedIngredients[type]=updatedCounted;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
       this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
       this.updatePurchaseState(updatedIngredients);
   } 

   removeIngredientHandler = (type)=>{
     const oldCount=this.state.ingredients[type];
     if(oldCount>0)
     {
        const updatedCounted =oldCount-1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
     }

   }
    render()
    {
        const disabledInfo= {...this.state.ingredients};
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key] ===0
        }
        return(
            <Helper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls 
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               disabled={disabledInfo}
               ordered={this.purchaseHandler}
               purchaseable={this.state.purchaseable}
               price={this.state.totalPrice}/>
            </Helper>
                )
    }
}

export default BurgerBuilder;