import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component
{
 state={
    orderForm:{
        
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }, 
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true
                },
                valid:false,
                
                touched:false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your E-mail address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },    
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options: [{value:'fastest',displayValue:'Fastest'},
                   {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                validation:{},
                value:'fastest',
               valid:true
            },
    },
      formIsValid:false,
     
 }//hello
 
 

 orderHandler=(event)=>{
     event.preventDefault();
     const formData= {};
     for(let formElId in this.state.orderForm)
     {
         formData[formElId]=this.state.orderForm[formElId].value;
        
     }
         const order = {
             ingredient:this.props.ings,
             price:this.props.totalPrice, // calculate on server side.
             orderData:formData,
             userId: this.props.userId
         }
        


         this.props.onOrderBurger(order,this.props.token);
         
 
 }
 checkValiditiy=(value,rules)=>{
    let isValid = true;
        if (!rules) {
            return true;
        }
       
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
           
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
           
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

     return isValid;
}

inputChangedHandler=(event,inputIdentifier)=>{

const updatedOrderForm={
    ...this.state.orderForm
};
const updatedFormEl={
    ...updatedOrderForm[inputIdentifier]
};
updatedFormEl.value=event.target.value;
updatedFormEl.valid=this.checkValiditiy(updatedFormEl.value,updatedFormEl.validation)
updatedFormEl.touched=true;
updatedOrderForm[inputIdentifier]=updatedFormEl;
let formIsValid=true;
for(let inputIdentifier in updatedOrderForm)
{
    formIsValid= updatedOrderForm[inputIdentifier].valid&&formIsValid
}
this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});

}

 render(){
     const formElementsArray= [];
     for (let key in this.state.orderForm)
     {
         formElementsArray.push({
                  id:key,
                  config:this.state.orderForm[key]
         });
     }
    let form = (
        <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formEl=>(
          <Input 
          key={formEl.id} 
          invalid={!formEl.config.valid}
          elementType={formEl.config.elementType}
           elementConfig={formEl.config.elementConfig} 
           shouldValidate={formEl.config.validation}
           value={formEl.config.value}
           touched={formEl.config.touched}
           changed={(event)=>this.inputChangedHandler(event,formEl.id)}/>  
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        </form>
     );
     if(this.props.loading)
       form=<Spinner/> 
    return(
         
        
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
              {form}
              </div>
     );
 }
}
const mapStatetoProps= state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
    };

    const mapsDispatchToProps = dispatch =>{
        return {
            onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    };
};
    
export default connect(mapStatetoProps,mapsDispatchToProps)(withErrorHandler(ContactData,axios));