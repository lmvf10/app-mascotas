import React from "react";
import "./Alert.css";

function Alert({alertSwitch=()=>{}}){
  return(
    <div className="alert alert-danger alert-dismissible" role="alert">
      <strong>Ooops!</strong>Algo salió mal, porfavor vuelve a intentarlo!
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close"
      onClick={alertSwitch}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default Alert;