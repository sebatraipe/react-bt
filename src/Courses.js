import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.listCourses = this.listCourses.bind(this);
    this.state = {
      courses: [],
    };
  }

  listCourses() {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          courses: json.cursos,
          resultado: json.result,
        });
      });
  }

  componentDidMount() {
    this.listCourses();
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
                <th>Horas</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.horas}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}
