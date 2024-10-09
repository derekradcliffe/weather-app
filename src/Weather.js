import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';
import { Button, Header, Grid, GridColumn, GridRow, Container, Loader, Dimmer } from 'semantic-ui-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const lat = useRef(null);
  const long = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${long.current}&units=imperial&appid=${process.env.REACT_APP_ID}`
      // );

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${long.current}&units=imperial&appid=4a8da96a2cb33e9e41ab23fe52a43e65`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
      fetchData();
    });
  };

  return (
    <div>
      <Button primary className="ui button" type="submit" onClick={handleGetLocation}>Let's Find Out</Button>

      {loading ? (
        <Dimmer active>
          <Loader active inverted>Fetching Weather...</Loader>
        </Dimmer>
      ) : weatherData ? (
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
