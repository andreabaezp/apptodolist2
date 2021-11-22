import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #ff9800;
  text-align: center;

`;

function Task({task, index}) {
  return (
    <Draggable  draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          aria-roledescription="Press space bar to lift the task"
        >
          {task.text}
        </Container>
      )}
    </Draggable>
  );
}
export default Task;
