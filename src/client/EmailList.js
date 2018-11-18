import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
const ipGetEmails = "http://172.104.41.68:5060/getEmail";
const FetchData = async ip => {
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
      arr: []
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    FetchData(ipGetEmails)
      .then(res => {
        console.log("in Email fetch");
        console.log(res);
        if (!("rows" in res)) return Promise.reject("resnull");
        let arr = res.rows;
        for (let i = 0; i < arr.length; i++) {
          let IdEmail = arr[i].IdEmail;
          let Email = arr[i].Email;
          this.setState(
            state => ({
              arr: [...this.state.arr, {IdEmail, Email}]
            }),
            () => {
              console.log(this.state.arr);
            }
          );
        }
      })
      .catch(err => {
        console.log("get QA err");
        console.log(err);
      });
  }
  handleChange(event) {
    let content = event.target.value;
    console.log(content);
    let arr = content.split("\n");
    console.log(arr);
    let newArr = arr.map((val, index)=>{return {IdEmail:index, Email:val}});
    this.setState(
      {
        arr: newArr
      },
      () => {
        console.log("in childd");
        console.log(this.state);
        this.props.onChange("emailList", this.state.arr);
      }
    );
  }
  componentDidMount() {
    this.props.onChange("emailList", this.state.arr);
  }
  render() {
    let newArrEmail = []
    for(let i = 0; i < this.state.arr.length; i++)
      newArrEmail.push(this.state.arr[i].Email);
    let emails = newArrEmail.join("\n");

    //console.log(this.state.arr);
    //console.log(emails);
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Danh sách Email</h5>
          <TextareaAutosize
            className="form-control"
            value={emails}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EmailList;
