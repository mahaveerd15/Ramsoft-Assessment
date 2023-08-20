import { useEffect, useState } from "react";
import Column from "./Column";
import { getBoardData, setBoardData } from "./Data";
import { Button, TextareaAutosize } from "@mui/material";

const Board = () => {
  const [columns, _setColumns] = useState([]);

  const setColumns = (data) => {
    _setColumns(data);
    persistBoard(data);
  };

  useEffect(() => {
    getBoardData().then((data) => {
      setColumns(data);
    });
  }, []);

  const persistBoard = (data) => {
    setBoardData(data);
  };

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

  const moveTask = (task, fromColId, toColId) => {
    task = { ...task };
    task.colId = toColId;
    const udpatedCols = [...columns];
    const fromColIndex = udpatedCols.findIndex((x) => x.id === fromColId);
    const toColIndex = udpatedCols.findIndex((x) => x.id === toColId);
    udpatedCols[fromColIndex].tasks = udpatedCols[fromColIndex].tasks.filter(
      (x) => x.id !== task.id
    );
    udpatedCols[toColIndex].tasks = [...udpatedCols[toColIndex].tasks, task];
    setColumns(udpatedCols);
  };

  return (
    <div className="board-div">
      <div className="add-column-btn">
        <Button onClick={handleAddColumn} variant="contained" color="primary">
        Add Column
      </Button>
      </div>
      <div className="column-container">
        {columns.map((col) => {
          return (
            <Column
              key={col.id}
              column={col}
              update={updateColumn}
              removeTask={removeTask}
              moveTask={moveTask}
            />
          );
        })}
      </div>
      {/* <textarea
        style={{ width: "100%", height: 400 }}
        value={JSON.stringify(columns, null, 2)}
      /> */}
    </div>
  );
};


export default Board;
