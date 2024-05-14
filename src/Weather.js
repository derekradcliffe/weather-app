import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';
import { Button, Header, Grid, GridColumn, GridRow, Container } from 'semantic-ui-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const lat = useRef(null);
  const long = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${long.current}&units=imperial&appid=${process.env.REACT_APP_ID}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
      fetchData();
    });
  };

  return (
    <div>
      <Button primary className="ui button" type="submit" onClick={handleGetLocation}>Let's Find Out</Button>

      {weatherData ? (
        <>
          <Header as='h1' id="pageSubheader" className='slide-top'>Currently in {weatherData.name}</Header>

          <Grid columns={3}>
            <GridRow>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Temperature: {Math.round(weatherData.main.temp)}°F</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Description: {weatherData.weather[0].description}</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Feels like : {Math.round(weatherData.main.feels_like)}°F</div>
                </Container>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Humidity : {weatherData.main.humidity}%</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Pressure : {weatherData.main.pressure}</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData slide-top'>Wind Speed : {Math.round(weatherData.wind.speed)} mph</div>
                </Container>
              </GridColumn>
            </GridRow>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
