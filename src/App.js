import React from 'react';
import Weather from './Weather';
import './styles/App.css';
import { Container, Header } from 'semantic-ui-react';

const App = () => {
  return (
    <Container id="main">
      <Header size='huge' id='pageHeader'>WeatHere</Header>
      <Weather />
    </Container >
  );
};

export default App;