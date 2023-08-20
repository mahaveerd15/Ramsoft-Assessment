import Task from "./Task";
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


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
    e.preventDefault();
    const data = e.dataTransfer.getData("taskJson");
    const task = JSON.parse(data);
    const fromColumnId = task.colId;
    const toColumnId = props.column.id;

    props.moveTask(task, fromColumnId, toColumnId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpdateTask = (updatedTask) => {
    const tasks = [...props.column.tasks];
    const index = tasks.findIndex((x) => x.id === updatedTask.id);
    tasks[index] = updatedTask;
    props.update(props.column.id, {
      ...props.column,
      tasks
    });
  };

  const handleRemoveTask = (task) => {
    const tasks = props.column.tasks.filter((x) => x.id !== task.id);
    props.update(props.column.id, {
      ...props.column,
      tasks
    });
  };

  return (
    <Card style={{width: "400px"}}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h6">{props.column.title}</Typography>
         <IconButton color="primary" onClick={onClickAdd}>
            <AddIcon />
          </IconButton>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ border: "1px solid lightgrey", padding: 10 }}
        >
          {props.column.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              updateTask={handleUpdateTask}
              removeTask={handleRemoveTask}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Column;
