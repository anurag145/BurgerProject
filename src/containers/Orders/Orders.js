import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component{

    componentDidMount(){
         this.props.onfetchOrders();
    }
render(){
    let orders = <Spinner/>
    if(!this.props.loading){
        orders=<div>
        {this.props.orders.map(order=>
            (  
                <Order
                 key={order.id}
                 ingredients={order.ingredient}
                 price={+order.price}
                />
                
            ))}
        </div>
    }

    return orders;
}
}
const mapsStateToProps = state=>{
    return{
        orders:state.order.orders,
        loading: state.order.loading
    }
}
const mapsDispatchToProps= dispatch =>{
    return{
        onfetchOrders:()=>dispatch(actions.fetchOrders())
    }
}
export default connect(mapsStateToProps,mapsDispatchToProps)( withErrorHandler(Orders,axios));