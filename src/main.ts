import "./style.css";

import { Events, User } from "./modules";

const events = new Events();

events.focusTextArea();
events.addTodoTask();
events.clearAll();

const user = new User(events.completeTodo, events.deleteTodo);

user.renderUserTasksList();

// const app = document.querySelector<HTMLDivElement>("#app")!;
