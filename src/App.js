import "./App.css";
import { useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");


  const formatDateTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const DeleteTodo = (id) => {
    setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            setToDos([...toDos, { id: Date.now(), text: toDo, status: false, date: new Date() }])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((object) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  onChange={(e) => {
                    console.log(e.target.checked);
                    console.log(object);
                    setToDos(
                      toDos.filter((object2) => {
                        if (object2.id === object.id) {
                          object2.status = e.target.checked;
                        }
                        return object2;
                      })
                    );
                  }}
                  value={object.status}
                  type="checkbox"
                />

                <p className="text-lamiiz">{object.text}</p>
                <p className="date_and_time">{formatDateTime(object.date)}</p>
              </div>
              <div className="right">
                <i onClick={() => DeleteTodo(object.id)} className="fas fa-times"></i>
              </div>
            </div>
          );
        })}
        {toDos.map((object) => {
          if (object.status) {
            return <h1>{object.text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
