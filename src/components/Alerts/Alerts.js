import React, {Component} from 'react';
import SuccessModal from '../shared/ui/Modal/SuccessModal';
import {RemoveAlert} from '../../store/actions/alert';
import {connect} from 'react-redux';


class Alerts extends Component{
    render(){
        return this.props.alerts.map((alert, i)=>{
            return<SuccessModal key={i} show={alert.show} title="Success" subtitle={alert.subtitle}  buttonText="Close" click={()=>this.props.removeAlert(i)}/>
        })
    }
}

const mapStateToProps = (state)=>({
    alerts:state.alerts,
})

const mapDispatchToProps = (dispatch)=>({
    removeAlert: (i)=>dispatch(RemoveAlert(i))
})

export default connect(mapStateToProps,mapDispatchToProps)(Alerts)