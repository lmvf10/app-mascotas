import React, {useState} from "react";
import Encabezado from "./Encabezado";
import Fila from "./Fila";
import "./Tabla.css";
import BotonAccion from "../BotonAccion/Boton";

function Table(){
  const [mascotas] = useState([
    {
      tipo: "Perro",
      nombre: "Bonnie",
      dueño: "Mama"
    },
     {
      tipo: "Perro",
      nombre: "Cheto",
      dueño: "Luis"
    }
  ]);

  const columnas = mascotas.length > 0 ? Object.keys(mascotas[0]) : [];

  return(
    <table className="table table-hover">
        <table className="table table-hover">
          <Encabezado columnas={columnas}/>
          <tbody id="lista-mascotas">
            {mascotas.map((mascota, index)=>(
            <tr>
              <th scope="row">{index}</th>
              <td>{mascota.tipo}</td>
              <td>{mascota.nombre}</td>
              <td>{mascota.dueño}</td>
              <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                      <BotonAccion tipo="editar" />
                      <BotonAccion tipo="eliminar" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>   
      
  );
}

export default Table;