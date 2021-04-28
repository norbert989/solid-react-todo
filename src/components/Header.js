import React from "react";

import {
  createThing,
  setThing,
  addUrl,
  addStringNoLocale,
  addBoolean,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";
import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";
import ReadTodoList from "../utils/ReadTodoList";

function Header({
  newTodo,
  handleNewTodo,
  dataSet,
  setNewTodo,
  setDataSet,
  setTodos,
  readUrl,
}) {
  const ENTER_KEY = 13;

  const handleNewTodoKeyDown = async (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    let val = newTodo.trim();

    let DataSetCopy = dataSet;

    let title = createThing({
      name: "title-" + val.replace(/\s+/g, "-"),
    });
    title = addUrl(title, RDF.type, AS.Article);
    title = addStringNoLocale(title, SCHEMA_INRUPT.name, val);
    title = addBoolean(title, "http://schema.org/status", false);
    DataSetCopy = setThing(DataSetCopy, title);

    try {
      await saveSolidDatasetAt(readUrl, DataSetCopy, {
        fetch: fetch,
      });

      ReadTodoList(readUrl, setDataSet, setTodos);

      // document.getElementById("savedtitles").value = listcontent;
    } catch (error) {
      console.log(error);
      // labelCreateStatus.textContent = "Error" + error;
      // labelCreateStatus.setAttribute("role", "alert");
    }

    if (val) {
      setNewTodo("");
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={handleNewTodo}
        onKeyDown={handleNewTodoKeyDown}
      />
    </header>
  );
}

export default Header;
