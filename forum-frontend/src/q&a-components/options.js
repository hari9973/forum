import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import './style/top.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class OptionsComponent extends Component{
  state={
    isLoggedIn:this.props.isLoggedIn,
    logout:this.props.logout,
    question_list_url:this.props.question_list_url,
  }

  cookies=new Cookies();

    render(){
        return(
  <React.Fragment> 
  <nav className="navbar navbar-inverse mycol">
  <div className="container-fluid">
    <ul className="nav navbar-nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/askquestion">Ask Question</Link></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li>
      {this.props.isLoggedIn?
                <Link to="/"><span className="glyphicon glyphicon-user"></span>
                <span>{this.props.username}</span></Link>:
                <Link to="/signup/"><span className="glyphicon glyphicon-user"></span>
                <span>SignUp</span></Link>
      }
       </li>
      <li>
      {this.props.isLoggedIn?
                <Link onClick={this.state.logout} className="nav-Link"  to="/login"><span className="glyphicon glyphicon-log-in"></span>
                <span>Logout</span></Link>:
                <Link className="nav-Link" to="/login"><span className="glyphicon glyphicon-log-in"></span>
                <span>Login</span></Link>
      }
       </li>
    </ul>
  </div>
</nav>
</React.Fragment>
        );
    }
}
export default OptionsComponent;