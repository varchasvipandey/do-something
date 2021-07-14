export const todoTaskTemplate = (value: string): string => {
  return `<div class="task-card todo" style="animation: insert 0.2s;"><div class="task-card__info">${value}</div><div class="task-card__action"><ion-icon name="checkmark-done-outline"></ion-icon></div></div>`;
};
