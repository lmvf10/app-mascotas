import React, {useState} from "react";
import "./ActionsMenu.css";
import Alert from "../Alert";

function Actionsmenu({cambiarModal = ()=>{}, titulo}){
  return(
    <div className="actions-menu">
        <h1>{titulo}</h1>
        <div className="actions-menu-content">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
          onClick={cambiarModal}>
            Nuevo
          </button>
          {/*<Alert />*/}
        </div>
      </div>
  );
}

export default Actionsmenu;