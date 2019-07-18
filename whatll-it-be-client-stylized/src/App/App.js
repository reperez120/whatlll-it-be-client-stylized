import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import LandingPage from '../LandingPage/LandingPage';
import LocationEntry from '../LocationEntryPage/LocationEntry';
import './App.css'


class App extends Component {

  render() {
    
    return (
      <div className='App'>
     <header className='appHeader'>
            <h1>
              What'll It Be?
            </h1>
      </header>
        <main>
        <Route 
            exact path='/' 
            component={LandingPage} 
          />
        <Route 
          exact path='/location-entry' 
          component={LocationEntry} 
        />
          <h6>   
            background image by Rachel E. Perez
          </h6>

        </main>
      </div>
    );
  } 
}

export default App;

