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

    fetchData();
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
          <Header as='h1'>{weatherData.name}</Header>

          <Grid columns={3}>
            <GridRow>
              <GridColumn>
                <Container>
                  <p>Temperature: {weatherData.main.temp}°C</p>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <p>Description: {weatherData.weather[0].description}</p>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <p>Feels like : {weatherData.main.feels_like}°C</p>
                </Container>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn>
                <Container>
                  <p>Humidity : {weatherData.main.humidity}%</p>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <p>Pressure : {weatherData.main.pressure}</p>
                </Container>
              </GridColumn>
              <GridColumn>
                <Container>
                  <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                </Container>
              </GridColumn>
            </GridRow>
          </Grid>
        </>
      ) : (
        <Header size='medium'>Click the button to find out your local weather</Header>
      )}
    </div>
  );
};

export default Weather;