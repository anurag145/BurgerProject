import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component
{
 state={
     name:'',
     email:'',
     address:{
         street:'',
         postalCode:''
     },
     loading:false
 }
 orderHandler=(event)=>{
     event.preventDefault();
     console.log(this.props.ingredients)
     this.setState({loading:true});
         const order = {
             ingredient:this.props.ingredients,
             price:this.props.price, // calculate on server side.
             customer: {
                  name: 'Anurag',
                  address : {
                      street : 'test',
                      zipCode: '12345',
                      country: 'India'
                  },
                 email: 'test@gmail.com'      
             },
             deliveryMethod: 'Fastest'
         }
         axios.post('/orders.json',order).then(response =>{
             
             this.setState({loading:false});
             this.props.history.push('/');
         }).catch(error=>{
            this.setState({loading:false});
            console.log(error,this.props.price);
         });
 
 }
 render(){
    let form = (
        <form>
        <Input inputtype='input' type="text" name="name" placeholder="Your Name"/>
        <Input inputtype='input' type="text" name="email" placeholder="Your Mail"/>
        <Input inputtype='input' type="text" name="street" placeholder="Your Street"/>
        <Input inputtype='input' type="text" name="postalCode" placeholder="Your Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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