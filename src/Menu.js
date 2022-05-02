import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchTxt: "",
    };
  }
  /* Le tiene que pasar la variable searchTxt al componente padre */
  handleSearch() {
    this.props.doSearch(this.state.searchTxt);
  }

  handleClicked(e, itemClicked) {
    this.props.handler(itemClicked);
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" onClick={(e) => this.handleClicked(e, 0)}>
              React-PDE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#" onClick={(e) => this.handleClicked(e, 1)}>
                  Estudiantes
                </Nav.Link>
                <Nav.Link href="#" onClick={(e) => this.handleClicked(e, 2)}>
                  Crear estudiante
                </Nav.Link>
                <Nav.Link href="#" onClick={(e) => this.handleClicked(e, 3)}>
                  Cursos
                </Nav.Link>
                <Nav.Link href="#" onClick={(e) => this.handleClicked(e, 4)}>
                  Inscribir a un curso
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Id..."
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) =>
                    this.setState({
                      searchTxt: e.target.value,
                    })
                  }
                />
                <Button variant="outline-primary" onClick={this.handleSearch}>
                  Buscar
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
