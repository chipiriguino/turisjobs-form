import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      lastname: "",
      email: "",
      password: "",
      checkbox: false,
      isError: {
        fullname: "",
        lastname: "",
        email: "",
        password: "",
        checkbox: "",
      },
    };
  }

  validation = (fullname) => {
    if (
      this.state.fullname !== "" &&
      this.state.lastname !== "" &&
      this.state.email !== "" &&
      this.state.checkbox
    ) {
      return alert(fullname + " te has registrado con éxito");
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    let isError = { ...this.state.isError };

    switch (name) {
      case "fullname":
        isError.fullname =
          value.length < 2
            ? "Debes completar este campo con mínimo 2 caracteres"
            : "";
        break;
      case "lastname":
        isError.lastname =
          value.length < 2
            ? "Debes completar este campo con mínimo 2 caracteres"
            : "";
        break;
      case "password":
        isError.password =
          value.length < 6
            ? "Debe completar este campo con mínimo 6 caracteres"
            : "";
        break;
      case "email":
        isError.email = regExp.test(value) ? "" : "Este mail no es válido";
        break;
      default:
        break;
    }

    this.setState({
      isError,
      [name]: value,
    });
  };

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      await this.checkForErrors();
      this.setState({
        fullname: "",
        lastname: "",
        email: "",
        checkbox: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { fullname, email, lastname, password, checkbox } = this.state;

    return (
      <div>
        <div className="text-pre-form">
          <h1>Regístrate en unos pocos pasos:</h1>
          <p>
            Rellena los campos con la información necesaria para crear una
            cuenta en nuestra web.
          </p>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <label className="name-label">Nombre</label>
          <div className="labels-align">
            <input
              type="text"
              name="fullname"
              placeholder="Indica tu nombre"
              value={fullname}
              onChange={(e) => this.handleChange(e)}
              required
            />
            {this.state.isError.fullname.length > 0 && (
              <span>{this.state.isError.fullname}</span>
            )}
          </div>
          <label className="name-label">Apellidos</label>
          <div className="labels-align">
            <input
              type="text"
              name="lastname"
              placeholder="Indica tu apellido/s"
              value={lastname}
              onChange={(e) => this.handleChange(e)}
              required
            />
            {this.state.isError.lastname.length > 0 && (
              <span>{this.state.isError.lastname}</span>
            )}
          </div>
          <label className="name-label">Contraseña</label>
          <div className="labels-align">
            <input
              type="password"
              name="password"
              placeholder="Indica tu contraseña"
              value={password}
              onChange={(e) => this.handleChange(e)}
              required
            />
            {this.state.isError.password.length > 0 && (
              <span>{this.state.isError.password}</span>
            )}
          </div>
          <label className="name-label">E-mail</label>
          <div className="labels-align">
            <input
              type="email"
              name="email"
              placeholder="Indica tu email"
              value={email}
              onChange={this.handleChange}
              required
            />
            {this.state.isError.email.length > 0 && (
              <span>{this.state.isError.email}</span>
            )}
          </div>
          <label className="name-label">Ciudad de nacimiento</label>
          <div className="labels-align">
            <select name="select">
              <option disabled selected>
                Selecciona tu ciudad de nacimiento
              </option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Valencia">Valencia</option>
              <option value="Sevilla">Sevilla</option>
            </select>
          </div>
          <div className="align-button">
            <label>
              <input
                className="check-box"
                type="checkbox"
                name="checkbox"
                value={checkbox}
                onChange={(e) => this.handleChange(e)}
                required
              />{" "}
              Acepto las Condiciones legales de la web que me registro
            </label>
            <div>
              {this.state.warning !== ""}
              <div>
                <input
                  onClick={() => {
                    this.validation(fullname);
                  }}
                  className="button"
                  type="submit"
                  value="REGISTRARME"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
