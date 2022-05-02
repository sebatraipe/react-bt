import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        curso: "",
      },
      resultado: "",
      errors: {},
      show: false,
      courses: [],
    };
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        curso: this.state.form.curso,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
            errors: json.errors,
            show: false,
          });
          return;
        }
        this.setState({
          resultado: "El estudiante fue creado con éxito!",
          errors: {},
          show: true,
        });
      });
  }

  componentDidMount() {
    fetch("http://localhost:1234/cursos")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          courses: json.cursos,
        });
      });
  }

  handleClose() {
    this.setState({
      show: false,
      form: {
        nombre: "",
        apellido: "",
      },
    });
  }

  render() {
    return (
      <div>
        <Card className="card">
          <div className="alert">
            {this.state.show && (
              <Alert variant="success" onClose={this.handleClose} dismissible>
                <Alert.Heading>Éxito!</Alert.Heading>
                <p>{this.state.resultado}</p>
              </Alert>
            )}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  onChange={this.handleChange}
                  value={this.state.form.nombre}
                  isInvalid={this.state.errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  onChange={this.handleChange}
                  value={this.state.form.apellido}
                  isInvalid={this.state.errors.apellido}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.apellido}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cursos</Form.Label>

                <Form.Control
                  name="curso"
                  onChange={this.handleChange}
                  as="select"
                >
                  {this.state.courses.map((c) => (
                    <option value={c.id}>{c.nombre + ", " + c.horas}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                onClick={this.handleSubmit}
                variant="primary"
                type="submit"
              >
                Aceptar
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}
