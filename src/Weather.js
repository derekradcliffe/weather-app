import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';
import { Button, Header, Grid, GridColumn, GridRow, Container, Loader, Dimmer } from 'semantic-ui-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const lat = useRef(null);
  const long = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weather.gov/points/${lat.current},${long.current}`
      );

      const cityResponse = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat.current}&lon=${long.current}&format=json`
      );

      const forcastResponse = await axios.get(response.data.properties.forecast);
      console.log(forcastResponse);
      setWeatherData(forcastResponse.data);
      setCityData(cityResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
      fetchData();
    });
  };

  return (
    <div>
      <Button primary className="ui button" type="submit" onClick={handleGetLocation}>Get me the weather</Button>

      {loading ? (
        <Dimmer active>
          <Loader active inverted>Fetching Weather...</Loader>
        </Dimmer>
      ) : weatherData ? (
        <>
        <div class='gridWrapper slide-top'>
        <Header as='h1' id="pageSubheaderCurrent" className='slide-top'>Currently in {cityData.address.suburb}</Header>

        <Grid className='current' stackable columns={3}>
          <GridRow>
            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Temperature: {Math.round(weatherData.properties.periods[0].temperature)}°F</div>
              </Container>
            </GridColumn>

            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Description: {weatherData.properties.periods[0].shortForecast}</div>
              </Container>
            </GridColumn>
            
            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Wind Speed: {weatherData.properties.periods[0].windSpeed}</div>
              </Container>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn width={16}>
              <Container>
                <div className='weatherData slide-top'>More Details: {weatherData.properties.periods[0].detailedForecast}</div>
              </Container>
            </GridColumn>
          </GridRow>
        </Grid>
        </div>

        <div class='gridWrapper slide-top'>
        <Header as='h1' id="pageSubheaderTomorrow" className='slide-top'>Tomorrow in {cityData.address.suburb}</Header>

        <Grid className='tomorrow' stackable columns={3}>
          <GridRow>
            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Temperature: {Math.round(weatherData.properties.periods[1].temperature)}°F</div>
              </Container>
            </GridColumn>

            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Description: {weatherData.properties.periods[1].shortForecast}</div>
              </Container>
            </GridColumn>
            
            <GridColumn width={5}>
              <Container>
                <div className='weatherData slide-top'>Wind Speed: {weatherData.properties.periods[1].windSpeed}</div>
              </Container>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn width={16}>
              <Container>
                <div className='weatherData slide-top'>More Details: {weatherData.properties.periods[1].detailedForecast}</div>
              </Container>
            </GridColumn>
          </GridRow>
        </Grid>
        </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
