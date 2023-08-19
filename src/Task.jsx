const Task = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskJson", JSON.stringify(props.task));
  };

  return (
    <div
      style={styles.container}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <b>
        {props.task.title} - ({props.task.deadline})
      </b>
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
  }
};

export default Task;
