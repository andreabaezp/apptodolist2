import { createStore } from "redux";

const state = {
  task: "",
  tasks: {
    "i-u": [],
    "i-nu": [],
    "ni-u": [],
    "ni-nu": [],
  },
  importance: "",
  isSnackBarOpen: false,
  snackBarMessage: "",
};

function updateStates(state, { type, payload }) {
  switch (type) {
    case "UPDATE_TASK":
      return { ...state, task: payload };
    case "UPDATE_ALERT":
      return { ...state, isSnackBarOpen: payload };
    case "UPDATE_ALERT_MESSAGE":
      return { ...state, snackBarMessage: payload };
    case "PUSH_CURRENT_TASK":
      state.tasks[state.importance].push({
        id: new Date().getTime(),
        text: state.task,
        done: false,
      });
      return { ...state, anchorEls: null, taskMenusOpen: false };
    case "UPDATE_IMPORTANCE":
      return { ...state, importance: payload };
    case "OPEN_TASK_MENU":
      return { ...state, anchorEls: payload.anchor, taskMenusOpen: true };
    case "CLOSE_TASK_MENU":
      return { ...state, anchorEls: null, taskMenusOpen: false };
    case "DELETE_TASK":
      const filteredTasks = state.tasks[payload.importance].filter((task) => {
        return payload.id !== task.id;
      });
      state.tasks[payload.importance] = filteredTasks;
      const copied = JSON.parse(JSON.stringify(state.tasks));
      return { ...state, tasks: copied };
    case "TOGGLE_DONE":
      const taskToEdit = state.tasks[payload.importance].find((task) => {
        return payload.id === task.id;
      });
      taskToEdit.done = !taskToEdit.done;
      const copied2 = JSON.parse(JSON.stringify(state.tasks));
      return { ...state, tasks: copied2 };
    default:
      return state;
  }
}

const store = createStore(updateStates, state);

export default store;
