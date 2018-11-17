import React, { Component } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
const ipGetEmails = "http://172.104.41.68:5060/getEmail";
const FetchData = async (ip) => {
  const rawResponse = await fetch(ip, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  const content = await rawResponse.json();
  //console.log('wtfffffffffffffffffffff');
  //console.log(content);
  return content;
};
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
  componentWillMount(){
    FetchData(ipGetEmails)
    .then()
    .catch()
  }
  handleChange(event){
    let content = event.target.value;
    console.log(content);
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
      <div className="card" >
      
        <div className="card-body">
          <h5 className="card-title">Danh sách Email</h5>
          <TextareaAutosize className="form-control" value={emails} onChange={this.handleChange}/>
          
        </div>
      </div>
    );
  }
}

export default EmailList;