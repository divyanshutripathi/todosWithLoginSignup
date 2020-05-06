import React, { Component } from "react";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = { activeList: "All" };
  }

  /**
   * task silmek için controller method
   * controller method for removing task
   * @param e
   */
  remove = (e) => {
    this.props.removeTask(e.target.parentNode.id);
  };

  /**
   * task statüsünü güncellemek için controller method
   * controller method for changing the task status
   * @param e
   */
  done = (e) => {
    this.props.doneTask(e.target.parentNode.id);
  };

  /**
   * Tümü, aktif yada tamamlanmış olanları listeler
   * Toggle list All, Active or done
   * @param e
   */
  changeList = (e) => {
    var listChanger = document.getElementById("listChanger");
    var li = listChanger.querySelectorAll("li");
    for (let i = 0; i < li.length; i++) {
      li[i].classList.remove("active");
    }
    var activeLi = e.target.parentNode;
    activeLi.classList.add("active");
    this.setState({ activeList: activeLi.innerText });
  };
  getStyle = (status) => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: status === "passive" ? "line-through" : "none",
    };
  };

  render() {
    let items_left = 0;
    const items = this.props.myList.map((elem, i) => {
      if (
        this.state.activeList === "All" ||
        (this.state.activeList === "Active" && elem.todoStatus === "active") ||
        (this.state.activeList === "Completed" && elem.todoStatus === "passive")
      ) {
        if (elem.todoStatus === "active") {
          items_left++;
        }
        return (
          <div style={this.getStyle(elem.todoStatus)}>
            <li key={i} id={elem.todoId} className={elem.todoStatus}>
              {/* <span className="id">{i + 1}</span> */}
              <span className="title">{elem.todoTitle}</span>
              <input
                type="checkbox"
                defaultChecked={elem.todoStatus === "passive" ? true : false}
                onChange={this.done}
              />
              <button onClick={this.remove} style={btnStyle}>
                x
              </button>
              {/* <span className="delete" onClick={this.remove}></span> */}
            </li>
          </div>
        );
      }
    });
    return (
      <div>
        <div className="todo-list type1">
          <ul>{items}</ul>
        </div>
        <div className="todo-filter type1">
          <div className="left">
            <span>
              <b>{items_left}</b> items left
            </span>
          </div>
          <div className="right" id="listChanger">
            <ul>
              <li className="active" onClick={this.changeList}>
                <span>All</span>
              </li>
              <li>
                <span onClick={this.changeList}>Active</span>
              </li>
              <li>
                <span onClick={this.changeList}>Completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};
