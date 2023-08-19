import { useState } from "react";
import Column from "./Column";

const Board = () => {
  const [columns, setColumns] = useState([
    {
      id: "c1",
      title: "TODO",
      tasks: [
        {
          id: "t1",
          colId: "c1",
          title: "First task",
          desc: "aaa",
          deadline: "aaaa"
        }
      ]
    },
    {
      id: "c2",
      title: "In prog",
      tasks: []
    }
  ]);

  const updateColumn = (id, update) => {
    const updatedColumns = [...columns];
    const index = updatedColumns.findIndex((col) => col.id === id);
    updatedColumns[index] = update;
    setColumns(updatedColumns);
  };

  const removeTask = (colId, taskId) => {
    const updatedColumns = [...columns];
    const colIndex = updatedColumns.findIndex((col) => col.id === colId);
    const col = { ...columns[colIndex] };
    col.tasks = [...col.tasks];
    const taskIndex = col.tasks.findIndex((task) => task.id === taskId);
    col.tasks.splice(taskIndex, 1);
    updatedColumns[colIndex] = col;
    setColumns(updatedColumns);
  };

  const handleAddColumn = () => {
    const title = prompt("Enter column title");
    const column = {
      title,
      tasks: [],
      id: `c${columns.length + 1}`
    };
    const updatedColumns = [...columns, column];
    setColumns(updatedColumns);
  };

  return (
    <div>
      <button onClick={handleAddColumn}>Add Column</button>
      <div style={styles.row}>
        {columns.map((col) => {
          return (
            <Column key={col.id} column={col} updateColumns={setColumns} />
          );
        })}
      </div>
      <textarea
        style={{ width: "100%", height: 400 }}
        value={JSON.stringify(columns, null, 2)}
      />
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    padding: 20,
    backgroundColor: "lightgrey"
  }
};

export default Board;
