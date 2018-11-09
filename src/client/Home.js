import React, { Component } from "react";
import PropTypes from "prop-types";
import {  notification, Icon } from 'antd';
import { Checkbox } from 'antd';


const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });
};


class AskAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ask: "aaa",
      ans: "sss"
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount(){

  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "ask" || name === "ans") {
      this.setState({ [name]: event.target.value });
      //console.log(this.state.ans);
    }
    this.props.onChange(name, event.target.value);
  }

  render() {
    return (
      <div class="col">
        <div class="form-group">
          <label for="comment" style={{ color: "black", fontWeight: "bold" }}>
            Câu hỏi:
          </label>
          <textarea
            name="ask"
            class="form-control"
            rows="4"
            id="comment"
            onChange={this.handleChange}
          >
            {this.state.ask}
          </textarea>
          <br />
          <br />
          <label for="comment" style={{ color: "black", fontWeight: "bold" }}>
            Câu trả lời:
          </label>
          <textarea
            name="ans"
            class="form-control"
            rows="9"
            id="comment"
            onChange={this.handleChange}
          >
            {this.state.ans}
          </textarea>
        </div>
      </div>
    );
  }
}

const checkboxes = [
  {
    name: "check-box-1",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "check-box-2",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "check-box-3",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "check-box-4",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "check-box-1",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "check-box-2",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "check-box-3",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "check-box-4",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "check-box-4",
    key: "checkBox4",
    label: "Check Box 4"
  },
  {
    name: "check-box-1",
    key: "checkBox1",
    label: "Check Box 1"
  },
  {
    name: "check-box-2",
    key: "checkBox2",
    label: "Check Box 2"
  },
  {
    name: "check-box-3",
    key: "checkBox3",
    label: "Check Box 3"
  },
  {
    name: "check-box-4",
    key: "checkBox4",
    label: "Check Box 4"
  }
];
/*
const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
*/
class CheckboxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
    this.props.onChange("checkedItems", this.state.checkedItems);
  }

  
  render() {
    let dem = 0;
    return (
      <div class="col mx-auto align-self-center justify-content-center text-center">
        <div class="row">
                {
                    checkboxes.map( (item) => {
                        //console.log(dem++);
                        dem++;
                        return (         
                                
                                    <div class="col-6" style={{height:45}}>      
                              
                                      
                                        <div class="checkbox">
                                        <label key={item.key}>
                                            <Checkbox
                                            name={item.name}
                                            checked={this.state.checkedItems.get(item.name)}
                                            onChange={this.handleChange}
                                            />
                                            {item.name}
                                        </label>
                                        </div>
                                    </div> 
                        );
                    }
                )
                }
            </div>
        </div>
      
    );
  }
}

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {data:{}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, val){
        let newData = this.state.data;
        //console.log(this.state);
        newData[key] = val;
        this.setState({
            data:newData
        })
        console.log(newData);
    }
    handleSubmit(e){
        //alert(this.state);
        //openNotification();
        e.preventDefault();
    }
  render() {
    return (
      <div class="container">
        <div class="row justify-content-between">
          <AskAns onChange={this.handleChange}/>
          <CheckboxContainer onChange={this.handleChange}/>
        </div>
        <br />
        <div class="row justify-content-around">
          <button type="button" class="btn btn-outline-success" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
