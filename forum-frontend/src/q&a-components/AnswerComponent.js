import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/top.css';

class PostAnswer extends React.Component{

    state={
        body:null,
    }
    constructor(props)
    {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleInputChange2=this.handleInputChange2.bind(this)
    }

    PostAnswer = (e) =>{
        // let data=new FormData();
        // data.append("title",this.state.title);
        // data.append("description",this.state.description);
        var body=this.state.body;
        var data=JSON.stringify({
            answer:body,
            profile_id:this.props.profile_id,
            question_id:this.props.question_id
        })
        console.log(this.props.profile_id);
        console.log(this.props.question_id);
        fetch("http://127.0.0.1:8000/forum/api/postanswer/",{
            method:'POST',
            headers: new Headers({
             'Authorization': `JWT ${this.props.token}`,
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             
                    }),
            body:data,
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            this.props.history.push("/");
        })
        .catch(e => {console.log (e);});
    }


    handleSubmit(event)
    {
        event.preventDefault();
        //console.log(this.state);
        this.PostAnswer(this.state);
    }

    handleInputChange(event)
    {
        event.preventDefault();
        //console.log(event.target.name,event.target.value);
        this.setState({
            [event.target.name]:event.target.value,
        })

    }

    handleInputChange2(event)
    {
        //event.preventDefault();
        //console.log(event);
        this.setState({
            body:event
        })

    }

    componentWillMount()
    {
    }

    componentDidMount()
    {

    }

    render()
    {
        return(
            <div class="form-group" align="center">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="body" >Post Comment</label>
                        {/* <textarea type="text" id="body" name="body" class="form-control" placeholder="Content"  onChange={this.handleInputChange}></textarea> */}
                        <ReactQuill modules={PostAnswer.modules} formats={PostAnswer.formats}  id="body" name="body" class="form-control" placeholder="Body" onChange={this.handleInputChange2}/>
                    </div>
                    <button class="btn btn-primary" >Save</button>
                </form>
            </div>
        );
    }
}


PostAnswer.modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ]
  };
  
PostAnswer.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
  ];

class AnswerComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          question: [],
          answers:[]
        };
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8000/forum/api/questionBody/" + this.props.match.params.id)
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({question: json});
                    });
        fetch("http://127.0.0.1:8000/forum/api/answers/" + this.props.match.params.id)
            .then( (response) => {
                return response.json() })   
                   .then( (json) => {
                       this.setState({answers: json});
                    });
    }
    render(){
        console.log(this.props.token);
      console.log(this.props.profile_id)
        return (
            
        <div>
            <legend  align = "center">Question</legend>
        <div className="container table-responsive" style={{border:"1px solid"}}>
            <table>
                <tr >
                <td ><div class="ql-snow ql-disabled"><div id="wrap-post" class="ql-editor"><div dangerouslySetInnerHTML={{ __html: this.state.question.body }} /></div></div>
                <div>
                </div></td>
                </tr>
            </table>
            </div>
            <br/>
            <legend  align = "center">comments</legend>
            <div>
            {this.state.answers.map(item => (
            <div>
            <div className="container table-responsive" style={{border:"1px solid"}}>
            <table>
                <tr >
                <td ><div class="ql-snow ql-disabled"><div id="wrap-post" class="ql-editor"><div dangerouslySetInnerHTML={{ __html: item.answer }} /></div></div>
                <div>
                </div></td>
                </tr>
            </table>
            </div>
            <br/>
            </div>
            ))}
            </div>
            <div>
                {
                    this.props.islogged ? <PostAnswer token={this.props.token} profile_id={this.props.profile_id} question_id={this.props.match.params.id} />:<div></div>
                }
            </div>
            </div>
         );

    }
}

export default AnswerComponent;