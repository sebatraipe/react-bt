import React, { Component } from "react";
import Welcom from "./Welcom";
import Students from "./Students";
import CreateStudent from "./CreateStudent";
import Courses from "./Courses";
import InscribeInCourse from "./InscribeInCourse";
import Container from "react-bootstrap/Container";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="body">
        {this.props.itemClicked === 0 && <Welcom />}
        {this.props.itemClicked === 1 && (
          <Students inputValue={this.props.inputValue} />
        )}
        {this.props.itemClicked === 2 && <CreateStudent />}
        {this.props.itemClicked === 3 && <Courses />}
        {this.props.itemClicked === 4 && <InscribeInCourse />}
      </Container>
    );
  }
}
