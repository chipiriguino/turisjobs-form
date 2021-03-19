import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
  this.state = { 
    fullname: "", 
    lastname:"",
    email: "",
    isError:{fullname:"",lastname:"",email:"",password:""}
    }
}

  handleChange = event => {
    const { name, value } = event.target;
    const regExp = RegExp(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    let isError = { ...this.state.isError };

        switch (name) {
            case "fullname":
                isError.fullname =
                    value.length < 2  ? "Debes completar este campo con mínimo 2 caracteres" : "";
                break;
                case "lastname":
                isError.lastname =
                    value.length < 2  ? "Debes completar este campo con mínimo 2 caracteres" : "";
                break;
                case "password":
                isError.password =
                    value.length < 6  ? "Debe completar este campo" : "";
                break;
            case "email":
                isError.email = regExp.test(value) ? "" : "Este mail no es válido";
            break;
            default:
                break;
        }

       
    this.setState({ 
      isError,
      [name]: value 
    });
  };

  handleFormSubmit = async(event) => {
    try {
      event.preventDefault()
      await this.checkForErrors()
    } catch (error) {
      console.log(error)
    }
    
  };

  render() {
    const { fullname, email,lastname,password,checkbox} = this.state;


    return (
      <div>
          <div className="text-pre-form">
          <h1>Regístrate en unos pocos pasos:</h1>
          <p>Rellena los campos con la información necesaria para crear una cuenta en nuestra web.</p>
          </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="labels-align">
          <label>Nombre</label><input  type="text" name="fullname" placeholder="Indica tu nombre" value={fullname}  onChange={e => this.handleChange(e)}  required/>
              {this.state.isError.fullname.length > 0 && (
              <span >{this.state.isError.fullname}</span>
              )}
          </div>
          <div className="labels-align" >
          <label>Apellidos</label><input  type="text" name="lastname" placeholder="Indica tu apellido/s" value={lastname}  onChange={e => this.handleChange(e)}  required/>
              {this.state.isError.lastname.length > 0 && (
              <span >{this.state.isError.lastname}</span>
              )}
          </div>
          <div className="labels-align" >
          <label>Contraseña</label><input type="password" name="password" placeholder="Indica tu contraseña" value={password}  onChange={e => this.handleChange(e)}  required/>
              {this.state.isError.lastname.length > 0 && (
              <span >{this.state.isError.lastname}</span>
              )}
          </div>
          <div className="labels-align" >
              <label>E-mail</label><input  type="email" name="email" placeholder="Indica tu email" value={email} onChange={this.handleChange} required/>
              {this.state.isError.email.length > 0 && (
              <span >{this.state.isError.email}</span>
              )}
          </div>
          
          <div className="labels-align">
          <label>Ciudad de nacimiento</label><select name="select" placeholder="Selecciona tu ciudad de nacimiento">
  <option value="value1">Madrid</option>
  <option value="value2" selected>Barcelona</option>
  <option value="value3">Valencia</option>
  <option value="value4">Sevilla</option>
</select>
</div>    
<div className="align-button">   
          <label ><input className="check-box"  type="checkbox" name="checkbox" value={checkbox} onChange={e => this.handleChange(e)}  required /> Acepto las Condiciones legales de la web que me registro</label>
          <div >
          {this.state.warning !== '' } 
          <div>
          <input onClick = {this.fullname} className="button"
                type="submit"
                value="REGISTRARME"
              />
              </div>
              </div> 
          </div>
          </form>
      </div>
    )
  }
}

export default Form;