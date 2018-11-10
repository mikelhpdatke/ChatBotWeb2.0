import React, { Component } from "react";
import "./Card.css";
import { Modal, Button } from 'antd';
import {ipServer, updateServer, FetchData} from './Home'

class ModelTrainning extends Component {
  state = {
    ModalText: 'Các câu hỏi mới sẽ được huấn luyện',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'Các câu hỏi mới sẽ được huấn luyện',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 5000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Train
        </Button>
        <Modal title="Chú ý"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

class ThongKe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Tổng số câu hỏi",
          num: 12
        },
        {
          name: "Số câu hỏi mới trong ngày",
          num: 12
        },
        {
          name: "Số câu hỏi mới được trả lời trong ngày",
          num: 40
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    let fetch = FetchData();
    fetch.then((res)=>{
      let arr = res.rows;
      let sum = arr.length;
      let arrToday = arr.filter((x)=>{
        let curTime = new Date();
        let objTime = new Date(x.AskingTime);
        return (curTime.getDate() == objTime.getDate() 
        && curTime.getMonth() == objTime.getMonth()
        && curTime.getFullYear() == objTime.getFullYear());
      });
      let newQuestionToday = arrToday.length;
      let newAnsweredToday = arrToday.filter((x)=>x.Checked == 1).length;
      this.setState({
        data: [
          {
            name: "Tổng số câu hỏi",
            num: sum
          },
          {
            name: "Số câu hỏi mới trong ngày",
            num: newQuestionToday
          },
          {
            name: "Số câu hỏi mới được trả lời trong ngày",
            num: newAnsweredToday
          }
        ]
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  handleSubmit(e){
      ModelTrainning();
      e.preventDefault();
  }
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.data.map(obj => {
            return (
              <div className="fullCard" id="thumbnail">
                <div className="cardContent">
                  <div className="cardText">
                    <h4>{obj.name}</h4>
                    <hr />
                  </div>
                  <div class="text-center" style={{ fontSize: 150 }}>
                    {obj.num}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="d-flex justify-content-center">
          <ModelTrainning/>
          
        </div>
      </div>
    );
  }
}

export default ThongKe;
