import Box from "@mui/material/Box";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { connect } from "react-redux";
import mapStateToProps from "../../../../store/helper";
import { useState } from "react";
import "./MatrixBoxTask.css";

function MatrixBoxTasks(store) {
  const [anchorEl, updateData] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    updateData(event.currentTarget);
  };

  const handleClose = () => {
    updateData(null);
  };

  const handleOnDelete = (e) => {
    store.dispatch({
      type: "DELETE_TASK",
      payload: { importance: store.boxImportance, id: store.taskParent.id },
    });
  };
  const handleOnDone = (e) => {
    store.dispatch({
      type: "TOGGLE_DONE",
      payload: { importance: store.boxImportance, id: store.taskParent.id },
    });
  };

  let doneOpenMenuItem;
  if (store.taskParent.done) {
    doneOpenMenuItem = (
      <MenuItem onClick={handleOnDone}>
        <ListItemIcon>
          <DoneIcon fontSize="small" />
        </ListItemIcon>
        Open
      </MenuItem>
    );
  } else {
    doneOpenMenuItem = (
      <MenuItem onClick={handleOnDone}>
        <ListItemIcon>
          <DoneIcon fontSize="small" />
        </ListItemIcon>
        Done
      </MenuItem>
    );
  }

  return (
    <div
      key={store.taskParent.id}
      className="d-flex justify-start align-center"
    >
      <div className={store.taskParent.done ? "done" : ""}>
        {store.taskParent.text}
      </div>

      {/* Menu */}
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {doneOpenMenuItem}

          <MenuItem onClick={handleOnDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>

        

        </Menu>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MatrixBoxTasks);
