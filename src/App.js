import React from 'react';
import Weather from './Weather';
import './styles.css';
import { Container, Header } from 'semantic-ui-react';

const App = () => {
  return (
    <Container >
      <Header size='huge' className='header'>Whats the weather?</Header>
      <Weather />
    </Container >
  );
};

export default App;