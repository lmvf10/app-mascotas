import React from "react";
import "./Input.css";

function Input({tipo, nombreCampo}){
  return(
    <input 
      type={tipo} 
      id={nombreCampo} 
      className="form-control" 
      name={nombreCampo}
      placeholder={nombreCampo} 
      aria-label="First name"/>
  );
}

export default Input;