import "./App.css";
import * as React from "react";
import RadioButtons from "./components/RadioButton/RadioButtons";
import TaskTextField from "./components/TaskTextField/TaskTextField";
import AddTaskButton from "./components/AddTaskButton/AddTaskButton";
import SetGoalField from "./components/SetGoalField/SetGoalField";
import Matriz from "./components/Matrix/Matriz";
import NavBar from "./components/NavBar/NavBar";
import Snackbar from "@mui/material/Snackbar";
// import Matriz from "./Matriz";
import { connect } from "react-redux";
import mapStateToProps from "./store/helper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange, green, purple } from "@mui/material/colors";
import Meme from "./components/Meme/Meme";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App(store) {
  const showAlert = (snackBarMessage, timeout = 3000) => {
    store.dispatch({ type: "UPDATE_ALERT", payload: true });
    store.dispatch({ type: "UPDATE_ALERT_MESSAGE", payload: snackBarMessage });
    setTimeout(() => {
      store.dispatch({ type: "UPDATE_ALERT", payload: false });
    }, timeout);
  };

  const sendData = (event) => {
    event.preventDefault();
    if (store.task.trim() === "") {
      showAlert("Please enter a task name");
      return;
    }

    if (store.importance === "") {
      showAlert("Please choose an importance");
      return;
    }
    store.dispatch({ type: "PUSH_CURRENT_TASK" });
    store.dispatch({ type: "UPDATE_TASK", payload: "" });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <form className="appContainer" onSubmit={sendData}>
          <SetGoalField />
          <TaskTextField />
          <RadioButtons />
          <AddTaskButton />
        </form>
        <Matriz />

        <Snackbar open={store.isSnackBarOpen} message={store.snackBarMessage} />
      </ThemeProvider>

      <div className="containerAll">
        <h2>Welcome to the adult meme quote generator!</h2>
        <Meme />
      </div>
    </>
  );
}

export default connect(mapStateToProps)(App);
