import { Task } from "../interfaces";
import { emptyImageId } from "../types";

export const createTaskCard = (
  task: Task,
  completeTodo: Function,
  deleteTodo: Function
): HTMLElement => {
  // Task card body
  const taskCard = document.createElement("div") as HTMLDivElement;

  const statusClass = task.completed ? "completed" : "todo";
  taskCard.classList.add("task-card", statusClass);

  taskCard.setAttribute("id", task.id);

  // task info
  const taskInfo = document.createElement("div") as HTMLDivElement;
  taskInfo.classList.add("task-card__info");
  const info = document.createTextNode(task.value);
  taskInfo.appendChild(info);

  // taks actions
  const taskCardAction = document.createElement("div") as HTMLDivElement;
  taskCardAction.classList.add("task-card__action");

  const actionIcon = task.completed
    ? '<ion-icon name="close-outline"></ion-icon>'
    : '<ion-icon name="checkmark-done-outline"></ion-icon>';

  taskCardAction.innerHTML += actionIcon;
  taskCardAction.addEventListener("click", () =>
    task.completed ? deleteTodo(task.id) : completeTodo(task.id)
  );

  // create task card
  taskCard.appendChild(taskInfo);
  taskCard.appendChild(taskCardAction);

  return taskCard;
};

export const renderEmptyImage = (
  parentNode: HTMLElement,
  image: string,
  imageType: emptyImageId
) => {
  const img = document.createElement("img") as HTMLImageElement;
  img.src = image;
  img.alt = "no todos";
  img.classList.add("no-task-img");
  img.id = imageType;
  parentNode.append(img);
};
