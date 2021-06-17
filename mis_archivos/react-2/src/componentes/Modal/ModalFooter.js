import React from "react";
import "./ModalFooter.css";

function ModalFooter({cambiarModal = () => {} }){
  return(
    <div className="modal-footer">
      <button type="button" id="close" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cambiarModal}>Close</button>
      <button type="button" id="savebtn" className="btn btn-primary" data-bs-dismiss="modal"data-bs-dismiss="modal" onClick={cambiarModal}>Save</button>
    </div>
  );
}

export default ModalFooter;