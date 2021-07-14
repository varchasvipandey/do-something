import { Task } from "../interfaces";

const db = "do-something-tasks";

export const initDB = (): void => {
  if (!localStorage.getItem(db)) localStorage.setItem(db, JSON.stringify([]));
};

export const postNewTask = (task: Task): void => {
  initDB();

  const currentDBState = localStorage.getItem(db);

  if (currentDBState) {
    localStorage.setItem(
      db,
      JSON.stringify([task, ...JSON.parse(currentDBState)])
    );
  }
};

export const getAllTasks = (): [] | Task[] => {
  const allTasks = localStorage.getItem(db);
  if (allTasks) return JSON.parse(allTasks);
  else return [];
};

export const getTaskById = (id: string): Task | boolean => {
  const allTasks = getAllTasks();
  const task = allTasks.filter((task: Task) => task.id === id);
  if (!!task?.[0]) return task[0];
  else return false;
};

export const getTodoTasks = (): [] | Task[] => {
  const allTasks = getAllTasks();
  if (allTasks) return allTasks.filter((task: Task) => !task.completed);
  else return [];
};

export const getCompletedTasks = (): [] | Task[] => {
  const allTasks = getAllTasks();
  if (allTasks) return allTasks.filter((task: Task) => task.completed);
  else return [];
};

export const markTaskAsCompleted = (id: string): void => {
  const allTasks = getAllTasks();
  if (allTasks) {
    const updatedTasks = allTasks.map((task: Task) =>
      task.id === id ? { ...task, completed: true } : task
    );

    localStorage.setItem(db, JSON.stringify(updatedTasks));
  }
};

export const deleteCompletedTask = (id: string): void => {
  const allTasks = getAllTasks();
  const updatedTasksList = allTasks.filter((task: Task) => task.id !== id);
  localStorage.setItem(db, JSON.stringify(updatedTasksList));
};
