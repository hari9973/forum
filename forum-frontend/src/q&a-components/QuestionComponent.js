import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/top.css';

class QuestionComponent extends React.Component{
    render(){
        return (
                    <p>{this.props.question}</p>
        );
    }
}


class Questions extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
    }
    
    componentDidMount() {
        fetch("http://127.0.0.1:8000/forum/api/questions/")
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({items: json});
                    });
    }

    render() {
      const { items } = this.state;
      console.log(this.props.token);
      console.log(this.props.profile_id)
        return(
        <div>    
        <legend  align = "center">Question</legend>
        <div className="container">
            <div>
            {items.map(item => ( 
            <div style={{border:"1px solid"}}>
              <div className="container">
              <table>
                <tr>
                <td class="col-md-6"><Link to={`/answers/${item.id}`}>
                  <div id="wrap-post"><QuestionComponent question={item.question} question_id={item.id} answer={item.body} token={this.props.token} profile_id={this.props.profile_id} /></div>
                </Link></td>
                </tr>
                </table>
                <br/>
              </div>
              </div>
            ))}
            <hr/>
            </div>
        </div>
        </div>
        );
    }
}


export default Questions;