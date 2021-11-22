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
  columns: {
    "column-all": {
      id: "column-all",
      title: "Tasks to Delegate",
      tasks: [],
    },
    "column-1": {
      id: "column-1",
      title: "Husband",
      tasks: [],
    },
    "column-2": {
      id: "column-2",
      title: "Kid 1",
      tasks: [],
    },
    "column-3": {
      id: "column-3",
      title: "Kid 2",
      tasks: [],
    },
  },
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
      const task = {
        id: new Date().getTime().toString(),
        text: state.task,
        done: false,
      }
      state.tasks[state.importance].push(task);
      if (state.importance === 'ni-nu') {
        state.columns['column-all'].tasks.push(task)
      }
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

      Object.values(state.columns).forEach(column => {
        column.tasks = column.tasks.filter(t => t.id !== payload.id)
      })

      return { ...state, tasks: copied };
    case "TOGGLE_DONE":
      const taskToEdit = state.tasks[payload.importance].find((task) => {
        return payload.id === task.id;
      });
      taskToEdit.done = !taskToEdit.done;
      const copied2 = JSON.parse(JSON.stringify(state.tasks));
      return { ...state, tasks: copied2 };
    case 'UPDATE_COLUMNS':
      return payload;
    default:
      return state;
  }
}

const store = createStore(updateStates, state);

export default store;
