import React, {Component} from 'react';
import SuccessModal from '../shared/ui/Modal/SuccessModal';
import SuccessModal2 from '../shared/ui/Modal/SuccessModal2';
import {RemoveAlert} from '../../store/actions/alert';
import {connect} from 'react-redux';


class Alerts extends Component{
    render(){
        return this.props.alerts.map((alert, i)=>{
            switch(alert.code){
                case 'success':
                    return <SuccessModal key={i} show={alert.show} title={alert.title} subtitle={alert.subtitle}  buttonText="Close" click={()=>this.props.removeAlert(i)}/>
                case 'success2':
                    return <SuccessModal2 key={i} show={alert.show} title={alert.title} subtitle={alert.subtitle}  buttonText="Close" closeHandler={()=>this.props.removeAlert(i)}/>
            }
        })
    }
}

const mapStateToProps = (state)=>({
    alerts:state.alerts.alerts,
})

const mapDispatchToProps = (dispatch)=>({
    removeAlert: (i)=>dispatch(RemoveAlert(i))
})

export default connect(mapStateToProps,mapDispatchToProps)(Alerts)