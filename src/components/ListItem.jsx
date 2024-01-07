import { useRef } from "react";
import { useEffect, useState } from "react";
import { MdDelete, MdBorderColor } from "react-icons/md";

export default function ListItem({
  name,
  handleDelete,
  id,
  handleTaskUpdate,
  item,
  toggleIsDone,
  isDone,
  items,
}) {
  const [editable, setEditable] = useState(false);
  const [isComplete, setIsComplete] = useState(isDone);
  const [editText, setEditText] = useState(name);
  const checkboxRef = useRef();

  useEffect(() => {
    localStorage.setItem("to-do-items", JSON.stringify(items));
  }, [isComplete, items]);

  function handleEdit() {
    setEditable(!editable);
  }

  function toggleComplete() {
    toggleIsDone(id, isDone);
  }

  function toggleCompleteText() {
    toggleIsDone(id, isDone);
    isDone
      ? (checkboxRef.current.checked = false)
      : (checkboxRef.current.checked = true);
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    setEditable(!editable);
    handleTaskUpdate(editText, id, isDone);
  }

  function handleTextUpdate(event) {
    setEditText(event.target.value);
    checkboxRef.current.checked = item.isDone;
  }

  let taskComplete = isDone
    ? "list-group-item d-flex justify-content-between align-items-center task-complete"
    : "list-group-item d-flex justify-content-between align-items-center";

  if (!editable) {
    return (
      <div className={taskComplete}>
        <input
          ref={checkboxRef}
          className="form-check-input me-1"
          type="checkbox"
          defaultChecked={isDone}
          id="thirdCheckboxStretched"
          onChange={toggleComplete}
        ></input>
        <div className="list-text" onClick={toggleCompleteText}>
          {name}
        </div>
        <div className="list-icons">
          <span className="badge bg-primary" onClick={handleEdit}>
            <MdBorderColor />
          </span>
          <span className="badge bg-primary" onClick={() => handleDelete(id)}>
            <MdDelete />
          </span>
        </div>
      </div>
    );
  }

  return (
    <form className="list-group-item input-group-edit d-flex justify-content-between align-items-center">
      <input
        type="text"
        id="inputEditText"
        className="form-control"
        value={editText}
        onChange={handleTextUpdate}
        autoFocus
      />
      <button
        type="submit"
        className="badge bg-primary"
        onClick={handleSaveEdit}
      >
        Save
      </button>
    </form>
  );
}
