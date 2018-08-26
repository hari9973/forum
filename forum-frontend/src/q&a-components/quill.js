import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
import ReactQuill from 'react-quill';


class QuillComponent extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = { text: '',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image','code','video'],
          ['clean']
        ],
      },
    
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','code','video'
      ]
    }   
    }   

    handleChange(value) {
      this.setState({ text: value })
    }
  
    render() {
      return (
        <ReactQuill value={this.state.text} onChange={this.handleChange} modules={this.state.modules} formats={this.state.formats} />
      )
    }
  }

  export default withRouter(QuillComponent);