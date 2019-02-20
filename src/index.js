import React, { Component } from "react";
import ReactDOM from "react-dom";
import data from "./data/data.js";
import RoomList from "./Components/RoomList";

import "./styles.css";
// https://testdriven.io/blog/tdd-with-react-jest-and-enzyme-part-one/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel_discount: 0.95,
      service_fee: 10,
      room: data,
      selected_room: -1,
      deleted_room: 0
    };
    this.onAddRoom.bind(this);
    this.onDeleteTrash.bind(this);
    this.roomInputChange.bind(this);
    this.onSelect.bind(this);
  }
  onDiscountChange(e) {
    this.setState({
      hotel_discount: e.target.value
    });
  }
  onServiceFeeChange(e) {
    this.setState({
      service_fee: e.target.value
    });
  }

  onAddRoom(e) {
    this.state.room.push({
      name: "名稱(中)",
      eng: "名稱(英)",
      price: 10000,
      amount: 1,
      cover: "https://i.ibb.co/gTSbBny/sec2-1.jpg",
      discount: 1,
      equipment: { wifi: false, bathtub: false, breakfast: true }
    });
    this.setState({
      room: this.state.room
    });
  }
  onDeleteTrash(e, key) {
    this.state.room.splice(key, 1);
    this.setState({
      room: this.state.room
    });
  }

  roomInputChange(e) {
    let name = e.target.name;
    let key = e.target.id;
    let value = e.target.value;
    let checked = e.target.checked ? "on" : "off";
    console.log(checked, name, value);

    this.state.room.map((room, key) => {
      // input change fields
      if (key != parseInt(e.target.id)) {
        return false;
      }

      switch (name) {
        case "txtName":
          this.state.room[key].name = value;
          break;
        case "txtEng":
          this.state.room[key].eng = value;
          break;
        case "txtImg":
          this.state.room[key].cover = value;
          break;
        case "numPrice":
          this.state.room[key].cover = value;
          break;
        case "numAmount":
          this.state.room[key].amount = value;
          break;
        case "numDiscount":
          this.state.room[key].discount = value;
          break;
        case "wifi":
          this.state.room[key].equipment.wifi = checked;
          break;
        case "coffee":
          this.state.room[key].equipment.breakfast = checked;
          break;
        case "bath":
          this.state.room[key].equipment.bathtub = checked;
          break;
      }

      this.setState({
        room: this.state.room
      });
    });
  }

  onSelect(e) {
    this.state.selected_room = e.target.value;
  }

  edit_form() {
    const room = this.state.room.map((room, key) => {
      //console.log(room, key);
      return (
        <div className="edit-room" key={key}>
          <label className="label-edit-tag">
            <h4>
              {room.name}
              <i
                className="fa fa-trash"
                onClick={e => {
                  this.onDeleteTrash(e, key);
                }}
                value={key}
                defaultValue={key}
              />
            </h4>
            <input type="checkbox" className="toggle-room" />
            <div className="edit-tag">
              <label>房間名稱(中)</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.txtName = e;
                  this.key = key;
                }}
                name="txtName"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultValue={room.name}
              />
              <label>房間名稱(英)</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.txtEng = e;
                }}
                name="txtEng"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultValue={room.eng}
              />
              <label>背景圖</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.txtImg = e;
                }}
                name="txtImg"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultValue={room.cover}
              />
              <label>房間折扣</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.numDiscount = e;
                }}
                id={key}
                name="numDiscount"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                defaultValue={room.discount}
              />
              <label>房間設備</label>
              <br />
              wifi
              <input
                type="checkbox"
                name="wifi"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                ref={e => {
                  this.wifi = e;
                }}
                id={key}
                defaultChecked={room.equipment.wifi}
              />
              早餐
              <input
                type="checkbox"
                name="coffee"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultChecked={room.equipment.breakfast}
              />
              衛浴
              <input
                type="checkbox"
                name="bath"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultChecked={room.equipment.bathtub}
              />
              <label>房間價格</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.numAmount = e;
                }}
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultValue={room.price}
              />
              <label>剩餘房間</label>
              <input
                type="text"
                className="form-control"
                ref={e => {
                  this.numAmount = e;
                }}
                name="numAmount"
                onChange={e => {
                  this.roomInputChange(e);
                }}
                id={key}
                defaultValue={room.amount}
              />
            </div>
          </label>
        </div>
      );
    });
    return room;
  }

  selectRoom() {
    const room = this.state.room.map((room, key) => {
      return (
        <option
          key={key}
          value={key}
          defaultValue={this.state.selected_room == key}
        >
          {room.name}
        </option>
      );
    });
    return room;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3 room_manager">
            <h2>房型管理</h2>
            <h5>飯店折扣</h5>
            <input
              type="text"
              className="form-control"
              value={this.state.hotel_discount}
              onChange={e => {
                this.onDiscountChange(e);
              }}
            />
            <h5>服務費</h5>
            <input
              type="text"
              className="form-control"
              value={this.state.service_fee}
              onChange={e => {
                this.onServiceFeeChange(e);
              }}
            />
            <label
              className="addRoom"
              onClick={e => {
                this.onAddRoom(e);
              }}
            >
              + 新增房間
            </label>
            <select
              onChange={e => {
                this.onSelect(e);
              }}
              className="form-control"
              ref={e => {
                this.handleSelect = e;
              }}
              defaultValue={this.state.selected_room}
            >
              {this.selectRoom()}
            </select>
            <div className="room-manager">
              <h3>房間維護</h3>
              {this.edit_form()}
            </div>
          </div>
          <div className="col-sm-9">
            <h2>房間一覽</h2>
            <div className="room_container">
              <div className="row">
                <RoomList
                  room={this.state.room}
                  hotel_discount={this.state.hotel_discount}
                  service_fee={this.state.service_fee}
                  onDeleteRoom={this.onDeleteRoom}
                  ref={roomlist => (this.roomlist = roomlist)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
