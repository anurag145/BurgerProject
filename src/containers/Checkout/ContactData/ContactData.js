import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
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
                valid:false
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
                valid:false
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
                    maxLenght:5
                },
                valid:false
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
                valid:false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your E-mail address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false
            },    
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options: [{value:'fastest',displayValue:'Fastest'},
                   {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                value:'',
               
            },
    },
     loading:false
 }
 
 

 orderHandler=(event)=>{
     event.preventDefault();
     console.log(this.props.ingredients)
     this.setState({loading:true});
     const formData= {};
     for(let formElId in this.state.orderForm)
     {
         formData[formElId]=this.state.orderForm[formElId].value;
         console.log(this.state.orderForm[formElId].value);
     }
     console.log(formData);
         const order = {
             ingredient:this.props.ingredients,
             price:this.props.price, // calculate on server side.
             orderData:formData
         }
         axios.post('/orders.json',order).then(response =>{
             
             this.setState({loading:false});
             this.props.history.push('/');
         }).catch(error=>{
            this.setState({loading:false});
            console.log(error,this.props.price);
         });
 
 }
 checkValiditiy=(value,rules)=>{
    let isValid=true;
     if(rules.required) 
     isValid=value.trim()!==''&&isValid;
      
     if(rules.minLength)
     isValid= value.length >=rules.minLength&&isValid;
     if(rules.maxLength)

     isValid= value.length <=rules.maxLength&&isValid;
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
updatedOrderForm[inputIdentifier]=updatedFormEl;
this.setState({orderForm:updatedOrderForm});
console.log(updatedFormEl.value);
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
          elementType={formEl.config.elementType}
           elementConfig={formEl.config.elementConfig} 
           value={formEl.config.value}
           changed={(event)=>this.inputChangedHandler(event,formEl.id)}/>  
        ))}
        <Button btnType="Success" >ORDER</Button>
        </form>
     );
     if(this.state.loading)
       form=<Spinner/> 
    return(
         
        
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
              {form}
              </div>
     );
 }
}
export default ContactData;