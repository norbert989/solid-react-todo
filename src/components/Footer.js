import React from "react";

function Footer({ Todos }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{Todos.length}</strong>
        <span> </span>
        <span>{Todos.length > 1 ? "items" : "item" }</span>
        <span> left</span>
      </span>
    </footer>
  );
}

export default Footer;
