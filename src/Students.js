import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.listStudents = this.listStudents.bind(this);
    this.state = {
      students: [],
    };
  }

  listStudents(inputValue) {
    fetch("http://localhost:1234/estudiantes?id=" + inputValue)
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          students: json.estudiantes,
          resultado: json.result,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue)
      this.listStudents(this.props.inputValue);
  }

  componentDidMount() {
    this.listStudents(this.props.inputValue);
  }

  render() {
    return (
      <div>
        <Card className="card">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id.</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Curso</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((s, index) => (
                <tr key={index}>
                  <td>{s.id}</td>
                  <td>{s.nombre}</td>
                  <td>{s.apellido}</td>
                  <td>{s.cursos.map((c, index) => c.nombre + " ")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}
