// utils/taskStorage.js

export function getTasks() {
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? JSON.parse(tasksJson) : [];
}

export function getPoints() {
  const pointsStr = localStorage.getItem("gamificationPoints");
  return pointsStr ? parseInt(pointsStr, 10) : 0;
}

export function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // update points
  const newPoints = getPoints() + (task.points || 0);
  localStorage.setItem("gamificationPoints", newPoints.toString());

  // notify listeners
  window.dispatchEvent(new Event("storage"));
}