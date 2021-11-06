import React, { Component } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../utils/data';
import './app.css'

class App extends Component {
  render(){
    return (
      <div className="App">
        <AppHeader />
        <Main data={data}/>
      </div>
    );
  }  
}

export default App;