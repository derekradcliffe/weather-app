import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Button, Header, Grid, GridColumn, GridRow, Container } from 'semantic-ui-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_ID}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <Button primary className="ui button" type="submit" onClick={handleSubmit}>Lets Find Out</Button>

      {weatherData ? (
        <>
          <Header as='h1' id="pageSubheader">Currently in {weatherData.name}</Header>

          <Grid columns={3}>
            <GridRow>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Temperature: {Math.round(weatherData.main.temp)}°F</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Description: {weatherData.weather[0].description}</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Feels like : {Math.round(weatherData.main.feels_like)}°F</div>
                </Container>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Humidity : {weatherData.main.humidity}%</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Pressure : {weatherData.main.pressure}</div>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <div className='weatherData'>Wind Speed : {Math.round(weatherData.wind.speed)} mph</div>
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