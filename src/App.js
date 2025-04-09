import React from 'react';
import Weather from './Weather';
import './styles/App.css';
import { Container, Header } from 'semantic-ui-react';

const App = () => {
  return (
    <Container id="main">
      <Header size='huge' id='pageHeader'>
        <div className='mainHeader'>WeatHere<span className="material-symbols-outlined">location_on</span></div>
      </Header>
      <Weather />
    </Container >
  );
};

export default App;