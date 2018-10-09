import React, { Component } from "react";
import { RECEIVE_MESSAGE, SEND_MESSAGE } from "./constants";
import socket from './common/socket';
import {observer} from 'mobx-react';

@observer
class App extends Component {

  render() {
    return (
      <div>
        <p> Hello World! </p>
      </div>
    );
  }
}

export default App;
