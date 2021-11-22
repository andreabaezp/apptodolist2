import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import mapStateToProps from "../../store/helper";

function TaskTextField(store) {
  const handelInputChangex = (event) => {
    store.dispatch({ type: "UPDATE_TASK", payload: event.target.value });
  };

  return (
    <TextField
      label="Write your task"
      variant="standard"
      value={store.task}
      onChange={handelInputChangex}
      type="text"
      autoComplete="off"
      fullWidth 
    />
  );
}


export default connect(mapStateToProps)(TaskTextField);