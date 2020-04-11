import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { func } from "prop-types";
import Context from "../context";
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1 rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    width: "50%",
  },
  input: {
    marginRight: "1rem",
  },
};
function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];

  if (todo.complited) {
    classes.push("done");
  }
  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.complited}
          onChange={() => onChange(todo.id)}
          styles={styles.input}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button onClick={() => removeTodo(todo.id)}>&times;</button>
    </li>
  );
}
TodoItem.proTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
export default TodoItem;
