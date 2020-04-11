import React, { useEffect } from "react";
import TodoList from "./todo/TodoList";
import Context from "./context";
// import AddTodo from "./todo/AddTodo";
import Loader from "./Loader";

const AddTodo = React.lazy(() => import("./todo/AddTodo"));
function App() {
  const [loading, setLoding] = React.useState(true);
  const [todos, setTodos] = React.useState([
    // { id: 1, complited: false, title: "Купить хлеб" },
    // { id: 2, complited: false, title: "Купить Масло" },
    // { id: 3, complited: false, title: "Купить Молоко" },
  ]);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todo) => {
        setTimeout(() => {
          setTodos(todo);
          setLoding(false);
        }, 2000);
      });
  }, []);
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          complited: false,
        },
      ])
    );
  }
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <React.Suspense fallback={<p>Loading</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
