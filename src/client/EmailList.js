import React, { Component } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

class EmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:[
        'fishface550@yahoo.com',
        'fishface57@hotmail.com',
        'fishfacefool@yahoo.com',
        'fishfactory22@yahoo.com',
        'fishfad@yahoo.com',
        'fishfan29@hotmail.com'
      ]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    let content = event.target.value;
    //console.log(content);
    let arr = content.split('\n');
    this.setState({
      arr:arr
    })
    //console.log(this.state);
    this.props.onChange('emailList', this.state.arr);
  }
  componentDidMount(){
    this.props.onChange('emailList', this.state.arr);
  }
  render() {
    let emails = this.state.arr.join('\n');
    
    //console.log(this.state.arr);
    //console.log(emails);
    return (
      <div class="card" >
      
        <div class="card-body">
          <h5 class="card-title">Danh sách Email</h5>
          <TextareaAutosize class="form-control" value={emails} onChange={this.handleChange}/>
          
        </div>
      </div>
    );
  }
}

export default EmailList;