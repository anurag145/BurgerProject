import React,{Component} from 'react';
import Helper from "../../hoc/Helper/Helper";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{
   state={
     ingredients:null,
     totalPrice: 4,
     purchaseable:false,
     purchasing:false,
     loading:false,
     error:false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/ingredients.json').then(response=>{
              this.setState({ingredients: response.data});
        }).catch(error=>{
           this.setState({error:true})
        });
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
         const queryParams=[];
         for(let i in this.state.ingredients )
         {
             queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
         }
         queryParams.push('price='+this.state.totalPrice);
         const queryString=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
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
        let burger = this.state.error?<p style={{textAlign:'center', margin:'250px'}}>Oops! something is not right!</p>:<Spinner/>;
        let orderSummary=null;
        if(this.state.ingredients)
        {
         burger= [<Burger key={Burger} ingredients={this.state.ingredients}/>,
            <BuildControls key={BuildControls}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={this.state.purchaseable}
        price={this.state.totalPrice}/>];

        orderSummary=
            <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
         }
        
       
            

            if(this.state.loading){
                orderSummary =<Spinner/>
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

export default withErrorHandler(BurgerBuilder,axios);