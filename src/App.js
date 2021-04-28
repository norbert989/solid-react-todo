import React from "react";
import "./App.css";

import { getSolidDataset, getThing, getUrl } from "@inrupt/solid-client";

import ReadTodoList from "./utils/ReadTodoList";

import Header from "./components/Header";
import Footer from "./components/Footer";
import handleRedirectAfterLogin from "./utils/handleRedirectAfterLogin";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

function App() {
  const [Todos, setTodos] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [dataSet, setDataSet] = React.useState();
  const [newTodo, setNewTodo] = React.useState();
  const [webId, setWebId] = React.useState();
  const [podRoot, setPodRoot] = React.useState();

  const handleNewTodo = (event) => {
    setNewTodo(event.target.value);
  };

  handleRedirectAfterLogin(setIsLoggedIn, setWebId);

  const getPodUrl = React.useCallback(async () => {
    if (webId) {
      const profileDoc = await getSolidDataset(webId);
      const profile = getThing(profileDoc, `${webId + "#me"}`);
      setPodRoot(getUrl(profile, "http://www.w3.org/ns/pim/space#storage"));
    }
  }, [webId]);

  React.useEffect(() => {
    if (isLoggedIn) {
      getPodUrl();
    }
  }, [getPodUrl, isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn && podRoot) {
      ReadTodoList(`${podRoot + "Todos/TodoList"}`, setDataSet, setTodos);
    }
  }, [isLoggedIn, podRoot]);

  return (
    <div className="app">
      <Login isLoggedIn={isLoggedIn} />
      <h1>{webId}</h1>
      <h2>{podRoot}</h2>
      { isLoggedIn &&
        <div className="todoapp">
          <Header
            newTodo={newTodo}
            handleNewTodo={handleNewTodo}
            dataSet={dataSet}
            setNewTodo={setNewTodo}
            setDataSet={setDataSet}
            setTodos={setTodos}
            readUrl={`${podRoot + "Todos/TodoList"}`}
          />
          <TodoList
            Todos={Todos}
            dataSet={dataSet}
            setDataSet={setDataSet}
            setTodos={setTodos}
            readUrl={`${podRoot + "Todos/TodoList"}`}
          />
          {Todos.length > 0 && <Footer Todos={Todos} />}
        </div>
      }
    </div>
  );
}

export default App;
