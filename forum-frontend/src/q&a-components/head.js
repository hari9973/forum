import React, { Component } from 'react';
import './style/top.css';

class HeaderComponent extends Component{

    render(){
        return (
            <React.Fragment>
            <div className="header">
            <span className="title">{this.props.title}</span>            
            </div>
            </React.Fragment>
        )
    }
}
export default HeaderComponent;