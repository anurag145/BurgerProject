import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Helper from '../Helper/Helper';
const withErrorHandler = (WrappedComponent,axios)=>{
return class extends Component{
    state={
        error:null
    }
    componentWillMount(){
        this.reqInterceptor=axios.interceptors.request.use(request=>{
            this.setState({error:null})
            return request;
        })
        this.resInterceptor=axios.interceptors.response.use(response=>response,error=>{
             this.setState({error:error});
        });
    }
    componentWillUnmount(){
       axios.interceptors.request.eject(this.reqInterceptor);
       axios.interceptors.response.eject(this.resInterceptor);
    }
    clickHandler=()=>{
        this.setState({error:null});
    }
    render(){
    return (
        <Helper>
            <Modal modalClosed={this.clickHandler}
            show={this.state.error}>
            {this.state.error? this.state.error.message:null}
            </Modal>
        <WrappedComponent {...this.props} />
        </Helper>
    );
}
}
}

export default withErrorHandler;