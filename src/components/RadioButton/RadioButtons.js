import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { connect } from "react-redux";
import mapStateToProps from "../../store/helper";
import "./RadioButtons.css"

function RadioButtons(store) {
  const setImportance = (event) => {
    store.dispatch({ type: "UPDATE_IMPORTANCE", payload: event.target.value });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>

      <RadioGroup name="radio-buttons-group" defaultValue="i-u" onChange={setImportance} >
        <FormControlLabel
          value="i-u"
          control={<Radio />}
          label="Important & Urgent"
          className="radioButtonColor"
          
        />
        <FormControlLabel
          value="i-nu"
          control={<Radio />}
          label="Important not Urgent"
        />
        <FormControlLabel
          value="ni-u"
          control={<Radio />}
          label="No important & Urgent"
        />
        <FormControlLabel
          value="ni-nu"
          control={<Radio />}
          label="No important not Urgent"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default connect(mapStateToProps)(RadioButtons);