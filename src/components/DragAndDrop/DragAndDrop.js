import React, { useState } from "react";
import ReactDOM from "react-dom";
// import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";
import { connect } from "react-redux";
import mapStateToProps from "../../store/helper";
import team from "../../img/team.png"
import "./DragAndDrop.css"

function DragAndDrop(store) {
  const [data, setData] = useState(initialData);

  const onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };

  const onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  const onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Object.keys(store.columns);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...store,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const home = store.columns[source.droppableId];
    const foreign = store.columns[destination.droppableId];

    if (home === foreign) {
      const newTasks = Array.from(home.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        tasks: newTasks,
      };

      const newState = {
        ...store,
        columns: {
          ...store.columns,
          [newHome.id]: newHome,
        },
      };

      setData(newState);
      return;
    }

    // moving from one list to another
    const taskToMove = home.tasks.find((t) => t.id === draggableId);
    const newTasks = home.tasks;
    newTasks.splice(source.index, 1);
    const newHome = {
      ...home,
      tasks: newTasks,
    };

    const foreignTaskIds = foreign.tasks;
    foreignTaskIds.splice(destination.index, 0, taskToMove);
    const newForeign = {
      ...foreign,
      tasks: foreignTaskIds,
    };

    const newState = {
      ...store,
      columns: {
        ...store.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    store.dispatch({ type: "UPDATE_COLUMNS", payload: newState });
  };

  return (
      <>
      <div className="wrap-delegating">

      <h3 className="title-delegating">Delegating empowers your team</h3>
      <img src={team} alt="" />

      </div>
    <div className="d-flex justify-center margin-top">
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="d-flex  "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.values(store.columns).map((column, index) => {
                return <Column key={column.id} column={column} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
    </>
  );
}
export default connect(mapStateToProps)(DragAndDrop);
