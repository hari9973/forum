import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class CreatePost extends Component{

    state={
        title:null,
        body:null,
    }
    constructor(props)
    {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleInputChange2=this.handleInputChange2.bind(this)
    }

    createPost = (e) =>{
        // let data=new FormData();
        // data.append("title",this.state.title);
        // data.append("description",this.state.description);
        var title=this.state.title;
        var body=this.state.body;
        var data=JSON.stringify({
            question:title,
            body:body,
            profile:this.props.id
        })
        console.log(this.props.token);
        console.log(this.props.id);
        fetch("http://127.0.0.1:8000/forum/api/postquestion/",{
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
        this.createPost(this.state);
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
            <div align="center">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="title" >Post Title</label>
                        <input type="text" id="title" name="title" class="form-control" placeholder="Title" onChange={this.handleInputChange}></input>
                    </div>
                    <div class="form-group">
                        <label for="body" >body</label>
                        <ReactQuill modules={CreatePost.modules} formats={CreatePost.formats}  id="body" name="body" class="form-control" placeholder="Body" onChange={this.handleInputChange2}/>
                    </div>
                    <button class="btn btn-primary" >Save</button>
                </form>
            </div>
        );
    }
}


CreatePost.modules = {
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
  
  CreatePost.formats = [
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

export default CreatePost;