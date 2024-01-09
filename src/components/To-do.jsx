import { useEffect, useState, Fragment } from "react";
import ListItem from "./ListItem";
import { useRef } from "react";
import { MdAddCircle } from "react-icons/md";
export function ToDo() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("to-do-items")) || [];
  });
  const [inputText, setInputText] = useState("");
  const [todoItem, setTodoItem] = useState({});
  const [activeItem, setActiveItem] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTodoItem({ name: inputText, id: Math.random(), isDone: false });
  }, [inputText]);

  useEffect(() => {
    setTodoItem({});
    localStorage.setItem("to-do-items", JSON.stringify(items));
  }, [items]);

  function handleTextChange(event) {
    setInputText(event.target.value);
  }

  function toggleIsDone(id, isDone) {
    console.log(items);
    const updatedTask = items.map((item) => {
      if (item.id === id) {
        item.isDone = !isDone;
      }
      return item;
    });
    setItems(updatedTask);
  }

  function handleSubmission(event) {
    event.preventDefault();
    if (!inputText || inputText.trim() === "") {
      setInputText("");
      inputRef.current.focus();
      return;
    }

    setItems((currentItems) => [todoItem, ...currentItems]);
    setInputText("");
    inputRef.current.focus();
  }

  function handleDelete(clickedItem) {
    console.log(clickedItem);
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== clickedItem)
    );
  }

  function handleTaskUpdate(taskName, id, isDone) {
    if (taskName) {
      const updatedTasks = items.map((item) =>
        item.id === id ? { name: taskName, id: item.id, isDone: isDone } : item
      );
      setItems(updatedTasks);
    }
    return;
  }

  function handleSort(e) {
    if (e.target.id === "sort-ascend") {
      setItems((currentItems) =>
        [...currentItems].sort((a, b) => b.name - a.name)
      );
    }

    if (e.target.id === "sort-descend") {
      setItems((currentItems) =>
        [...currentItems].sort((a, b) => a.name - b.name)
      );
    }
    return;
  }

  return (
    <div className="card">
      <div className="class-header">Simple React To do App</div>

      <div className="card-body">
        <form className="input-group" onSubmit={handleSubmission}>
          <input
            type="text"
            ref={inputRef}
            id="inputText"
            className="form-control"
            placeholder="Add a to do item.."
            value={inputText}
            onChange={handleTextChange}
          />
          <button type="submit" className="btn btn-primary">
            <MdAddCircle />
          </button>
        </form>
        <ul className="list-group list-group-flush">
          <div className="button-functions">
            <div id="sort-ascend" onClick={handleSort}>
              ⬆️
            </div>
            <div id="sort-descend" onClick={handleSort}>
              ⬇️
            </div>
          </div>
          {items.map((item) => (
            <Fragment key={item.id}>
              <ListItem
                name={item.name}
                handleDelete={handleDelete}
                id={item.id}
                handleTaskUpdate={handleTaskUpdate}
                item={item}
                toggleIsDone={toggleIsDone}
                isDone={item.isDone}
                items={items}
              />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
