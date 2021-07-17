import { DOMElements } from ".";
import {
  id,
  postNewTask,
  markTaskAsCompleted,
  getTaskById,
  deleteCompletedTask,
  getTodoTasks,
  renderEmptyImage,
  getCompletedTasks,
  deleteAllTasks,
} from "../utils";
import { Task } from "../interfaces";
import { createTaskCard } from "../utils/createElem";

import { emptyImageId } from "../types";

import noTodoImg from "../images/no-todo-task.svg";
import noCompletedImg from "../images/no-completed-tasks.svg";

export class Events {
  private domElements = new DOMElements();

  public focusTextArea = () => {
    this.domElements.todoText.focus();
  };

  public removeEmptyImage = (id: emptyImageId): void => {
    let elem = document.getElementById(id) as HTMLDivElement;
    if (!elem) return;
    elem.parentNode?.removeChild(elem);
  };

  public removeTaskCard = (id: string): void => {
    let elem = document.getElementById(id) as HTMLDivElement;
    elem.classList.add("remove");
    setTimeout(() => {
      elem.parentNode?.removeChild(elem);
    }, 200); // remove from UI
  };

  public completeTodo = (id: string): void => {
    markTaskAsCompleted(id);
    this.removeTaskCard(id);

    let updatedTask = getTaskById(id); // get updated task

    if (typeof updatedTask === "object") {
      const taskCard = createTaskCard(
        updatedTask,
        this.completeTodo,
        this.deleteTodo
      );

      // insert task card
      this.domElements.completedSection.prepend(taskCard);

      // check if todos list is empty - render empty image
      if (!getTodoTasks().length) {
        // render image
        renderEmptyImage(this.domElements.todoSection, noTodoImg, "empty-todo");
      }

      this.removeEmptyImage("empty-completed");
    }

    this.domElements.todoText.focus();
  };

  public deleteTodo = (id: string): void => {
    deleteCompletedTask(id);
    this.removeTaskCard(id);

    if (!getCompletedTasks().length) {
      // render image
      renderEmptyImage(
        this.domElements.completedSection,
        noCompletedImg,
        "empty-completed"
      );
    }
  };

  private submitTask = (event: KeyboardEvent | MouseEvent): void => {
    if (event instanceof KeyboardEvent && event.code !== "Enter") return;

    const value = this.domElements.todoText?.value;

    if (!value) return;

    // create task data
    const taskId = `TODO${id()}`;
    const task: Task = {
      id: taskId,
      value,
      completed: false,
    };

    postNewTask(task);

    // Task card
    const taskCard = createTaskCard(task, this.completeTodo, this.deleteTodo);

    // remove empty image
    this.removeEmptyImage("empty-todo");

    // insert task card
    this.domElements.todoSection.prepend(taskCard);

    this.domElements.todoText.value = "";
    this.domElements.todoText.focus();
  };

  public addTodoTask = (): void => {
    this.domElements.addButton?.addEventListener("click", this.submitTask);
    document.addEventListener("keydown", this.submitTask);
  };

  private deleteAllTasks = (): void => {
    deleteAllTasks();
    this.domElements.todoSection.innerHTML = "";
    this.domElements.completedSection.innerHTML = "";

    // render image
    renderEmptyImage(this.domElements.todoSection, noTodoImg, "empty-todo");

    // render empty images
    renderEmptyImage(
      this.domElements.completedSection,
      noCompletedImg,
      "empty-completed"
    );
  };

  public clearAll = (): void => {
    this.domElements.clearButton?.addEventListener(
      "click",
      this.deleteAllTasks
    );
  };
}
