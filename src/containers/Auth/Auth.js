import React ,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from "react-router-dom";
class Auth extends Component{

    state ={
        controls: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }


    switchAuthModeHandler = ()=>{
        this.setState(prevState=>{
            return {isSignUp:!prevState.isSignUp}
        })
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
    inputChangedHandler=(event,controlName)=>{

        const updatedControls={
            ...this.state.controls
        };
        const updatedFormEl={
            ...updatedControls[controlName]
        };
        updatedFormEl.value=event.target.value;
        updatedFormEl.valid=this.checkValiditiy(updatedFormEl.value,updatedFormEl.validation)
        updatedFormEl.touched=true;
        updatedControls[controlName]=updatedFormEl;
        // let formIsValid=true;
        // for(let inputIdentifier in updatedControls)
        // {
        //     formIsValid= updatedControls[inputIdentifier].valid&&formIsValid
        // }
        this.setState({controls:updatedControls});
      
        }

        onSubmitHandler = (event)=>{
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
        }
render()
{const formElementsArray= [];
    for (let key in this.state.controls)
    {
        formElementsArray.push({
                 id:key,
                 config:this.state.controls[key]
        });
    }
    let form = formElementsArray.map(formEl =>(
   <Input
     key={formEl.id}
    invalid={!formEl.config.valid}
    elementType={formEl.config.elementType}
     elementConfig={formEl.config.elementConfig} 
     shouldValidate={formEl.config.validation}
     value={formEl.config.value}
     touched={formEl.config.touched}
     changed={(event)=>this.inputChangedHandler(event,formEl.id)}

   />
    ));

    if(this.props.loading)
    form= <Spinner/>

      let errorMessage =null;
      if(this.props.error)
      errorMessage=(
      <p>{this.props.error.message}</p>);

 

      let authRedirect = null;
      if (this.props.isAuthenticated) {
          authRedirect = <Redirect to={this.props.authRedirectPath}/>
      }


    return ( <div className={classes.Auth}>
    {authRedirect}
                {errorMessage}
        <form onSubmit={this.onSubmitHandler}> 
         {form}
         <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
        clicked={this.switchAuthModeHandler}
        btnType="Danger"> Switch To {this.state.isSignUp?'SIGNIN':'SIGNUP'}</Button>

    </div>)
}
}
const mapStateToProps = state =>{
    return {
     loading : state.auth.loading,
     error:state.auth.error,
     buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
     isAuthenticated:state.auth.token!==null
    };
};
const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);