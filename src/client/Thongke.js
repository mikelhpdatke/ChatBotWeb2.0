import React, { Component } from "react";
import "./Card.css";
import { Modal, Button, notification } from "antd";
import { ipServer, updateServer, FetchData } from "./Home";
import BarChart from "./Bar";

const doneNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="medium"
      onClick={() => notification.close(key)}
    >
      Confirm
    </Button>
  );
  notification.open({
    message: "THÔNG BÁO",
    description: "Trainning thành công!!!",
    btn,
    key,
    onClose: close,
    style: { fontWeight: "bold", color: "red" }
  });
};

class ModelTrainning extends Component {
  state = {
    ModalText: "HUẤN LUYỆN VỚI DỮ LIỆU MỚI",
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "HUẤN LUYỆN VỚI DỮ LIỆU MỚI",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      doneNotification();
    }, 5000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} size="large">
          Train
        </Button>
        <Modal
          title="THÔNG BÁO"
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
    //this.barChartRef = React.createRef();
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
          name: "Số câu hỏi mới đã trả lời",
          num: 40
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleData(){
    let fetch = FetchData();
    fetch
      .then(res => {
        let arr = res.rows;
        let sum = arr.length;
        let arrToday = arr.filter(x => {
          let curTime = new Date();
          let objTime = new Date(x.AskingTime);
          return (
            curTime.getDate() == objTime.getDate() &&
            curTime.getMonth() == objTime.getMonth() &&
            curTime.getFullYear() == objTime.getFullYear()
          );
        });
        let newQuestionToday = arrToday.length;
        let newAnsweredToday = arrToday.filter(x => x.Checked == 1).length;
        console.log(sum, newAnsweredToday, newAnsweredToday);
        this.setState({
          data: [
            {
              name: "Tổng số câu hỏi",
              num: sum + 50000
            },
            {
              name: "Số câu hỏi mới trong ngày",
              num: newQuestionToday
            },
            {
              name: "Số câu hỏi mới đã trả lời",
              num: newAnsweredToday
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillMount() {
    this.handleData();
    this.myInterval = setInterval(()=>{
      this.handleData();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  
  handleSubmit(e) {
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
                    <h4 class="mx-auto">{obj.name}</h4>
                    <hr style={{marginTop:'5px', marginBottom:'5px'}}/>
                  </div>
                  <div
                    class="text-center"
                    style={{ fontSize: "45px", color: "rgba(225, 21, 31, 0.8)" }}
                  >
                    {obj.num}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <hr class="fancy-line" />
        <div class="d-flex justify-content-center">
          <BarChart />
        </div>
        <div class="d-flex justify-content-center">
          <ModelTrainning />
        </div>
      </div>
    );
  }
}

export default ThongKe;
