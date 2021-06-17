import React from "react";
import ModalHeader from "./ModalHeader"
import Select from "../Select/select"
import "./Modal.css"; 
import Input from "../Input/Input";
import ModalFooter from "./ModalFooter";

const tiposMascota = [
                  {valor:"Tipo animal", etiqueta: "Tipo animal"},
                  {valor:"Perro", etiqueta: "Perro"},
                  {valor:"Gato", etiqueta: "Gato"},
                  {valor:"Pájaro", etiqueta: "Pájaro"},
                  {valor:"Otro", etiqueta: "Otro"},
                ];

function Modal({cambiarModal=()=>{}}){
  return(
    <>
    <div className="modal">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <ModalHeader cambiarModal={cambiarModal}/>
          <div className="modal-body">
            <form id="form">
              <input type="hidden" id="indice" />
              <div className="row">
                <div className="col">
                  <Input tipo="text" nombreCampo="Nombre"/>
                </div>
                <div className="col">
                  <input type="text" id="dueño" className="form-control" name="dueño" placeholder="Dueño" aria-label="Last name"/>
                </div>
              </div>
              < Select options ={tiposMascota}
                nombreCampo="Tipo Animal"/>
            </form>
          </div>
          <ModalFooter cambiarModal={cambiarModal}/>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </>
  );
}

export default Modal;