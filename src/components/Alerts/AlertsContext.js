import React, {Fragment, Component} from 'react';
import SuccessModal from '../shared/ui/Modal/SuccessModal';



const AlertsContext = React.createContext(null);

export default class AlertsProvider extends Component {
    state= {
        alerts:[
            {show:true,
            message:"sdksjlksg",
            mode:'Success'}
        ]
    }

    createAlert = (alert)=>{
        let newAlert = {...alert, show:true}
        let alerts = [...this.state.alerts, newAlert]
        this.setState({alerts})
    }

    removeAlert =(i)=>{
        let newAlerts= [this.state.alerts];
        newAlerts.pop(i);
        this.setState({alerts:newAlerts});
    }

    render(){
        
        let contextData = {
            alerts : this.state.alerts,
            createAlert: this.createAlert,
            removeAlert: this.removeAlert,
        } 
        return (
            <Fragment>
                <AlertsContext.Provider value={contextData}>
                    {this.props.children}
                </AlertsContext.Provider>
                <Alerts alerts={this.state.alerts} removeAlert={this.removeAlert}/>
            </Fragment>

        )
    }
}

const Alerts = ({alerts, removeAlert})=>(
    alerts.map((alert, i)=>{
        return<SuccessModal key={i} show={alert.show} title="Success" subtitle={alert.message}  buttonText="Close" click={()=>removeAlert(i)}/>
    })
)

export const withAlerts =  (WrappedComponent)=>{
    return (props)=>{
        return <AlertsContext.Consumer>
            {(contextVal)=> <WrappedComponent {...contextVal} {...props}/> }
        </AlertsContext.Consumer>
    }
}
