import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      weather: null
    }
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
  }

  async getWeatherInfo() {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&&units=imperial&APPID=${process.env.WEATHER_API_KEY}`);

    let weatherInfo = await response.data;

    this.setState({
      weather: weatherInfo.main.temp
    })
  }

  getLocation() {
    let locationObject = this;


    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(lng, lat)

      locationObject.setState({
        latitude: lat,
        longitude: lng
      });
      locationObject.getWeatherInfo();
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(displayLocationInfo, (err) => {
        console.log(err);
      });
    } else {
      console.log("No geolocation");
    }
  }

  componentDidMount() {
    this.getLocation();
  }
  render() {


    return (
      <div className="App">
        <header className="App-header">

          <h3>Weather</h3>
          {(this.state.weather) ?
            <p>Temperature: {this.state.weather}</p>
            :
            <p>Loading Weather..</p>
          }
        </header>
      </div >
    );
  }
}

export default App;








