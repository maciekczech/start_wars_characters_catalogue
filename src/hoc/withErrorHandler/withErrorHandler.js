import React, {Component} from 'react';
import Modal from './../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        }
        
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});  
            });
        }

        componentWillUnmount(){
            //this HOC is supposed to be reused but the problem is that brand-new interceptor instances are created whenever different component is wrapped with withErrorHandler. This leads to memmory leakage, hence we want to eject interceptors every time a component is unmounted.
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render(){
            
            return(
                <>
                    <Modal visible={this.state.error} hideModalAndBackdrop={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}    
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        };
    }
};

export default withErrorHandler;