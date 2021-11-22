import { connect } from "react-redux";
import mapStateToProps from "../../../store/helper";
import MatrixBoxTasks from "./MatrixBoxTask/MatrixBoxTask";
import './MatrixBox.css'

function MatrixBox(store) {
  return (
    <>
      <div className={store.boxClass}>
        <h3 className="subtitleMatriz">{store.boxTitle}</h3>
        <div className="matrix-box-wrapper">
          {store.tasks[store.boxImportance].map((task) => {
            return <MatrixBoxTasks key={task.id} taskParent={task} boxImportance={store.boxImportance} />;
          })}
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MatrixBox);
