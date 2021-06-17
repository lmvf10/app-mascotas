import React, { Component} from "react";
import Nav from "./componentes/Nav/index";
import Actionsmenu from "./componentes/ActionsMenu/actions-menu";
import Table from "./componentes/Tabla/Table";
import Modal from "./componentes/Modal/Modal";

class Pagina extends Component{
  constructor(props){
    super(props);
    this.state = {
      mostrarModal: false,
    };
  }

  cambiarModal = ()=>{
    this.setState({mostrarModal: !this.state.mostrarModal});
  }

  //el método render siempre debe ir al final
  render(){
      const {titulo = "Página sin título"}=this.props;
      return (
      <>
      <div className="container">
        <Nav/>
          <Actionsmenu cambiarModal={this.cambiarModal} titulo={titulo}/>
          <Table/>
          {this.state.mostrarModal && <Modal cambiarModa={this.cambiarModal} />}
      </div>
      
      </>
    );
  }  
}

export default Pagina;
