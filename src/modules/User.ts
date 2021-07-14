import { DOMElements } from ".";
import {
  getTodoTasks,
  getCompletedTasks,
  createTaskCard,
  renderEmptyImage,
} from "../utils";

import noTodoImg from "../images/no-todo-task.svg";
import noCompletedImg from "../images/no-completed-tasks.svg";

export class User {
  constructor(public completeTodo: Function, public deleteTodo: Function) {}

  renderUserTasksList = () => {
    /* Todo tasks */
    const todoTaskCards = getTodoTasks().map((taskData) =>
      createTaskCard(taskData, this.completeTodo, this.deleteTodo)
    );

    if (!!todoTaskCards?.length) {
      const todoCollection = document.createDocumentFragment();
      todoTaskCards.forEach((taskCard) => todoCollection.append(taskCard));
      DOMElements.sectionTodo.append(todoCollection);
    } else renderEmptyImage(DOMElements.sectionTodo, noTodoImg, "empty-todo");

    /* Completed tasks */
    const completedTaskCards = getCompletedTasks().map((taskData) =>
      createTaskCard(taskData, this.completeTodo, this.deleteTodo)
    );

    if (!!completedTaskCards?.length) {
      const completedCollection = document.createDocumentFragment();
      completedTaskCards.forEach((taskCard) =>
        completedCollection.prepend(taskCard)
      );
      DOMElements.sectionCompleted.append(completedCollection);
    } else
      renderEmptyImage(
        DOMElements.sectionCompleted,
        noCompletedImg,
        "empty-completed"
      );
  };
}
