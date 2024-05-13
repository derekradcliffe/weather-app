import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Button, FormField, Header, Grid, GridColumn, GridRow } from 'semantic-ui-react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_ID}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <FormField className='inputForm' onSubmit={handleSubmit}>
        <input
          type = "text"
          placeholder = "Enter city name"
          value = {city}
          onChange = {handleInputChange}
        />
        <Button primary class="ui button" type = "submit">Get the Weather</Button>
      </FormField>
      {weatherData ? (
        <>
        <h2>{weatherData.name}</h2>
          {/* <p>Temperature: {weatherData.main.temp}°C</p> */}
          {/* <p>Description: {weatherData.weather[0].description}</p> */}
          {/* <p>Feels like : {weatherData.main.feels_like}°C</p> */}
          {/* <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p> */}

          <Grid columns={3}>
    <GridRow>
        <GridColumn>
            <p>Temperature: {weatherData.main.temp}°C</p>
        </GridColumn>
        <GridColumn>
            <p>Description: {weatherData.weather[0].description}</p>
        </GridColumn>
        <GridColumn>
            <p>Feels like : {weatherData.main.feels_like}°C</p>
        </GridColumn>
    </GridRow>

    <GridRow>
      <GridColumn>
      <p>Humidity : {weatherData.main.humidity}%</p>
      </GridColumn>
      <GridColumn>
      <p>Pressure : {weatherData.main.pressure}</p>
      </GridColumn>
      <GridColumn>
      <p>Wind Speed : {weatherData.wind.speed}m/s</p>
      </GridColumn>
    </GridRow>
  </Grid>
        </>
      ) : (
        <Header size='medium'>Please enter a city</Header>
      )}
    </div>
  );
};

export default Weather;