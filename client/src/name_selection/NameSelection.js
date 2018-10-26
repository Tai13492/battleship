import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@withRouter
@inject("socket")
@observer
class NameSelection extends React.Component {
  onInputChange = e => this.props.socket.setName(e.target.value);
  onSubmit = e => e.preventDefault();
  render() {
    return <div> Hello World</div>;
  }
}
export default NameSelection;
