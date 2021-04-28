import React from "react";
import Todo from "./Todo";

import {
  removeThing,
  setThing,
  setBoolean,
  saveSolidDatasetAt,
  getThing,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";
import ReadTodoList from "../utils/ReadTodoList";

function TodoList({ Todos, dataSet, setDataSet, setTodos, readUrl }) {
  const completeTodo = async (thingUrl, currentStatus) => {
    let DataSetCopy = dataSet;
    let ThingCopy = getThing(DataSetCopy, thingUrl);
    ThingCopy = setBoolean(
      ThingCopy,
      "http://schema.org/status",
      !currentStatus
    );
    DataSetCopy = setThing(DataSetCopy, ThingCopy);

    try {
      await saveSolidDatasetAt(
        readUrl,
        DataSetCopy,
        {
          fetch: fetch,
        }
      );

      ReadTodoList(readUrl, setDataSet, setTodos);
    } catch (error) {
      console.log(error);
      // labelCreateStatus.textContent = "Error" + error;
      // labelCreateStatus.setAttribute("role", "alert");
    }
  };

  const removeTodo = async (thingUrl) => {
    let DataSetCopy = dataSet;
    DataSetCopy = removeThing(DataSetCopy, thingUrl);

    try {
      await saveSolidDatasetAt(
        readUrl,
        DataSetCopy,
        {
          fetch: fetch,
        }
      );

      ReadTodoList(readUrl, setDataSet, setTodos);

      // document.getElementById("savedtitles").value = listcontent;
    } catch (error) {
      console.log(error);
      // labelCreateStatus.textContent = "Error" + error;
      // labelCreateStatus.setAttribute("role", "alert");
    }
  };

  return (
    <section className="main">
      <ul className="todo-list">
        {Todos.map((todo, index) => (
          <Todo
            key={`${index}+${todo}`}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
