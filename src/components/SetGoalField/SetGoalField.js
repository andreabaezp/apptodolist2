import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./SetGoalField.css"

const SetGoalField = () => {
  return (
    <div  className="goalField">
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Write your goal here" id="fullWidth" />
      </Box>
    </div>
  );
};

export default SetGoalField;
