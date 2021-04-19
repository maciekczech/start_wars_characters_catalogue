import React, {Component} from 'react'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css'

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.visible !== this.props.visible || nextProps.children !== this.props.children){
            return true;
        }
        else {
            return false;
        }
    }

    render(){
        return (
            <>
            <Backdrop
                visible={this.props.visible}
                hide={this.props.hideModalAndBackdrop}
                />
            <div
            className={classes.Modal}
            style={{
                transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.visible ? '1' : '0'
            }}
            >
                {this.props.children}
            </div>
            </>
        );
}
};

export default Modal; 