import { connect } from "react-redux";
import mapStateToProps from "../../../store/helper";
import MatrixBoxTasks from "./MatrixBoxTasks";

function MatrixBox(store) {


  return (
    <>
      <div className={store.boxClass}>
        <h3 className="subtitleMatriz">{store.boxTitle}</h3>
        {store.tasks[store.boxImportance].map((task) => {
          return (
            <MatrixBoxTasks key={task.id} task={task} />
          );
        })}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MatrixBox);
