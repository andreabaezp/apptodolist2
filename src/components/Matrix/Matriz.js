import { connect } from "react-redux";
import mapStateToProps from "../../store/helper";
import "./Matriz.css"
import MatrixBox from "./MatrixBox/MatrixBox";

function Matriz(store) {

  return (
    <>
    
    <div className="bgimgMatriz">
      <div className="containerMatriz">

        <MatrixBox boxImportance="i-u" boxTitle="Important / Urgent" boxClass="area1"/>
        <MatrixBox boxImportance="i-nu" boxTitle="Important / not Urgent" boxClass="area2"/>
        <MatrixBox boxImportance="ni-u" boxTitle="Not important / Urgent" boxClass="area3"/>
        <MatrixBox boxImportance="ni-nu" boxTitle="Not important / not Urgent" boxClass="area4"/>

        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Matriz);
