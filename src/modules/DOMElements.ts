export class DOMElements {
  public todoSection = document.getElementById(
    "task-section-todo"
  ) as HTMLDivElement;
  public completedSection = document.getElementById(
    "task-section-completed"
  ) as HTMLDivElement;
  public addButton = document.getElementById("add-button") as HTMLButtonElement;
  public clearButton = document.getElementById(
    "clear-button"
  ) as HTMLButtonElement;
  public todoText = document.getElementById("todo-text") as HTMLTextAreaElement;

  public static sectionTodo = document.getElementById(
    "task-section-todo"
  ) as HTMLDivElement;
  public static sectionCompleted = document.getElementById(
    "task-section-completed"
  ) as HTMLDivElement;
}
