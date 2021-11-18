import { createStore } from "redux";

const state = {
  task: "test",
  tasks: {
    "i-u": [],
    "i-nu": [],
    "ni-u": [],
    "ni-nu": [],
  },
  importance: "i-u",
  alert: false,
  alertMessage: "",
  anchorEls: null,
  taskMenusOpen: null,
};

function updateStates(state, { type, payload }) {
  switch (type) {
    case "UPDATE_TASK":
      return { ...state, task: payload };
    case "UPDATE_ALERT":
      return { ...state, alert: payload };
    case "UPDATE_ALERT_MESSAGE":
      return { ...state, alertMessage: payload };
    case "PUSH_CURRENT_TASK":
      const id = new Date().getTime()
      state.tasks[state.importance].push({
        id,
        text: state.task,
      });
      return { ...state, anchorEls: null, taskMenusOpen: false };
    case "UPDATE_IMPORTANCE":
      return { ...state, importance: payload };
    case 'OPEN_TASK_MENU':
      console.log('OPEN_TASK_MENU', payload)
      return { ...state, anchorEls: payload.anchor, taskMenusOpen: true}
    case 'CLOSE_TASK_MENU':
      console.log('close task menu')
      return { ...state, anchorEls: null, taskMenusOpen: false}
    default:
      return state;
  }
}

const store = createStore(updateStates, state);

export default store;
