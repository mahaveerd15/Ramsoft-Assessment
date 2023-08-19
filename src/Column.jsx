import Task from "./Task";

const Column = (props) => {
  const onClickAdd = () => {
    const title = prompt("Enter name");
    const desc = prompt("Enter description");
    const deadline = prompt("Enter deadline (yyyy-mm-dd)");

    const task = {
      title,
      desc,
      deadline,
      id: new Date().getTime(),
      colId: props.column.id
    };
    props.update(props.column.id, {
      ...props.column,
      tasks: [...props.column.tasks, task]
    });
  };

  const handleDrop = (e) => {
    console.log("hello");
    e.preventDefault();
    const data = e.dataTransfer.getData("taskJson");
    const task = JSON.parse(data);
    const removeColId = task.colId;
    task.colId = props.column.id;
    props.update(props.column.id, {
      ...props.column,
      tasks: [...props.column.tasks, task]
    });
    props.removeTask(removeColId, task.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div>{props.column.title}</div>
        <button onClick={onClickAdd}>Add</button>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: "1px solid lightgrey", padding: 10 }}
      >
        {props.column.tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    border: "1px solid grey",
    margin: 10,
    background: "white"
  },
  row: {
    display: "flex",
    justifyContent: "space-between"
  }
};

export default Column;
