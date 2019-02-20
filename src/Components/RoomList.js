import React, { Component } from "react";
import ReactDOM from "react-dom";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.room
    };
    this.deleteBtn.bind(this);
  }
  deleteBtn(e, key) {
    this.state.room.splice(key, 1);
    this.setState({
      room: this.state.room
    });
  }
  render() {
    return this.state.room.map((room, key) => {
      const css_bg_image = { backgroundImage: "url('" + room.cover + "')" };
      const total_discount = parseInt(
        room.discount * this.props.hotel_discount * 100
      );
      const final_price =
        parseInt((room.price * total_discount) / 100) +
        parseInt(this.props.service_fee);

      return (
        <div key={key} className="col-sm-4 room-list">
          <div className="cover" style={css_bg_image}>
            <h3>{room.name}</h3>
            <i
              className="delete_btn"
              onClick={e => {
                this.deleteBtn(e, key);
              }}
            >
              X
            </i>
          </div>
          <div className="info">
            <h3>
              {room.eng}
              {room.equipment.breakfast ? <i className="fa fa-coffee" /> : ""}
              {room.equipment.wifi ? <i className="fa fa-wifi" /> : ""}
              {room.equipment.bathtub ? <i className="fa fa-bath" /> : ""}
            </h3>

            <h4>
              {room.discount} * {this.props.hotel_discount} = {total_discount}
            </h4>
            <h5>
              <s>{room.price}</s>
              <span className="price">{final_price}</span>
            </h5>
          </div>
        </div>
      );
    });
  }
}
export default RoomList;
