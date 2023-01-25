const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
const createTask = (_name) => {
  const task = {
    id: (TASKS.length + 1).toString(),
    name: _name,
    isComplete: false
  };

  TASKS.push(task);
  return JSON.stringify(task);
};
const getTasks = () => {
  return JSON.stringify(TASKS);
};
const getTaskById = (id) => {
  return JSON.stringify(TASKS.find(element => element.id === String(id)));
};
const updateTaskById = (id, task) => {
  TASKS[TASKS.indexOf(TASKS.find(element => element.id === String(id)))] = task;
  return (
    JSON.stringify(TASKS.find(element => element.id === id)));
};
const changeStatusOfTaskById = (id) => {
  TASKS[TASKS.indexOf(TASKS.find(element => element.id === String(id)))].isComplete = true;
  return JSON.stringify(TASKS[TASKS.indexOf(TASKS.find(element => element.id === String(id)))]);
};
const deleteCompletedTasks = () => {

  TASKS = TASKS.filter(element => element.isComplete == false);

  return (
    JSON.stringify(TASKS));
};

let TASKS = [];
app.get('/tasks', (req, res) => {
  res.send(getTasks());
});
app.get(/\/tasks\/([0-9]+)/, (req, res) => {
  res.send(getTaskById(req.params[0]));
});
app.post('/tasks', (req, res) => {
  res.send(createTask(req.body.name));
});
app.patch(/\/tasks\/([0-9]+)/, (req, res) => {
  res.send(changeStatusOfTaskById(req.params[0]));
});
app.put(/\/tasks\/([0-9]+)/, (req, res) => {
  res.send(updateTaskById(req.body.id, req.body));
});
app.delete('/tasks', (req, res) => {
  res.send(deleteCompletedTasks());
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});