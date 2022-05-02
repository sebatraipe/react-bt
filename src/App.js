import { Component } from "react";
import "./App.css";
import Body from "./Body";
import Menu from "./Menu";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleItemMenuClicked = this.handleItemMenuClicked.bind(this);
    this.handleDoSearch = this.handleDoSearch.bind(this);
    this.state = {
      itemMenu: 0,
      searchTxt: "",
    };
  }

  handleDoSearch(inputValue) {
    this.setState({
      searchTxt: inputValue,
      itemMenu: 1,
    });
  }

  handleItemMenuClicked(itemClickeado) {
    this.setState({
      itemMenu: itemClickeado,
      searchTxt: "",
    });
  }

  render() {
    return (
      <>
        {/**Le pasa por props la funcion handle */}
        <Menu
          doSearch={this.handleDoSearch}
          handler={this.handleItemMenuClicked}
        />
        {/**Le paso por props el valor del state, que es 0  */}
        <Body
          inputValue={this.state.searchTxt}
          itemClicked={this.state.itemMenu}
        />
      </>
    );
  }
}
