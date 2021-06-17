import React from "react";
import "./Select.css";

function Select({options=[], nombreCampo = "vacio"}){
  return(
    <div ClassName="row">
      <div ClassName="col">
        <select id="tipo" ClassName="form-select form-select-sm" aria-label=".form-select-sm example">
          {options.map(({valor, etiqueta},index)=>(
          <option 
          key={`${nombreCampo}-${index}-${valor}-${etiqueta}`} 
          value={valor}>
            {etiqueta}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;