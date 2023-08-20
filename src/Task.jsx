const Task = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskJson", JSON.stringify(props.task));
  };

  const handleEdit = () => {
    const title = prompt("Title");
    const desc = prompt("Description");
    const deadline = prompt("Deadline");
    const updatedTask = {
      ...props.task,
      title,
      desc,
      deadline
    };
    props.updateTask(updatedTask);
  };

  const handleRemove = () => {
    const remove = window.confirm("Remove task?");
    if (remove) {
      props.removeTask(props.task);
    }
  };

  return (
    <div
      style={styles.container}
      draggable={true}
      onDragStart={handleDragStart}
      onDoubleClick={handleEdit}
    >
      <b>
        {props.task.title} - ({props.task.deadline})
      </b>
      <span onClick={handleRemove} style={styles.remove}>
        X
      </span>
      <div>{props.task.desc}</div>
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    border: "1px solid grey",
    background: "powderblue",
    borderRadius: 10
  },
  remove: {
    border: "1px solid black",
    marginLeft: 10,
    cursor: "pointer"
  }
};

export default Task;
