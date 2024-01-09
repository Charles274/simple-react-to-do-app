import { ToDo } from "./components/To-do";
import "./components/styles/ListItem.css";
import "./components/styles/App.css";
import Form from "./components/Form";

export default function App() {
  return (
    <div className="container">
      <ToDo />
      <Form />
    </div>
  );
}
