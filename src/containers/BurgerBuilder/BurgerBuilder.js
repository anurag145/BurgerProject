import React,{Component} from 'react';
import Helper from "../../hoc/Helper";
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component{
    render()
    {
        return(
            <Helper>
               <Burger/>
            </Helper>
                )
    }
}

export default BurgerBuilder;