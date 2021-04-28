import React from "react";

function Todo({ todo, completeTodo, removeTodo }) {
  return (
    <li className={`${todo[2] ? "completed" : ""}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo[2]}
          onChange={() => completeTodo(todo[1], todo[2])}
        />
        <label>{todo[0]}</label>
        <button className="destroy" onClick={() => removeTodo(todo[1])} />
      </div>
      <input
        className="edit"
        // value={this.state.editText}
        // onBlur={this.handleSubmit}
        // onChange={this.handleChange}
        // onKeyDown={this.handleKeyDown}
      />
    </li>
  );
}

export default Todo;
