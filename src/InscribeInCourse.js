import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

export default class InscribeInCourse extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      form: {
        estudiante: "",
        curso: "",
      },
      resultado: "",
      show: false,
      estudiantes: [],
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

    fetch("http://localhost:1234/inscribirEstudiante", {
      method: "POST",
      body: JSON.stringify({
        estudiante: this.state.form.estudiante,
        curso: this.state.form.curso,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
            show: false,
          });
          return;
        }
        this.setState({
          resultado: "El estudiante se creó con éxito!",
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
    fetch("http://localhost:1234/estudiantes")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
        });
      });
  }

  handleClose() {
    this.setState({
      show: false,
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
                <Form.Label>Seleccione el curso</Form.Label>

                <Form.Control
                  name="curso"
                  as="select"
                  onChange={this.handleChange}
                >
                  {this.state.courses.map((c) => (
                    <option value={c.id}>{c.nombre + ", " + c.horas}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Seleccione el estudiante</Form.Label>

                <Form.Control
                  name="estudiante"
                  as="select"
                  onChange={this.handleChange}
                >
                  {this.state.estudiantes.map((e) => (
                    <option value={e.id}>{e.nombre + ", " + e.apellido}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
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
