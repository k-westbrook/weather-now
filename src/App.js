import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      temp: null,
      loadLocation: false,
      tempClassName: 'normal-temp'
    }
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getWeatherInfo() {



    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`);

    let weatherInfo = response.data;

    this.setState({
      temp: weatherInfo.main.temp,
      locationName: weatherInfo.name
    })
    this.updateFontClass();
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

  handleClick() {
    this.setState({
      loadLocation: true
    })
    this.getLocation();

  }

  updateFontClass() {

    if (this.state.temp > 80) {
      this.setState({
        tempClassName: 'hot-temp'
      })
    } else if (this.state.temp < 40) {
      this.setState({
        tempClassName: 'cold-temp'
      })
    }
  }

  render() {
    console.log(this.state.temp)
    console.log(this.state.tempClassName)
    return (
      <div className="App">
        <header className="App-header">

          <h3 className="front-header">Weather</h3>
          {(this.state.temp) ?
            <div className="weather-data-points">
              <h5>Location: {this.state.locationName}</h5>
              <h5 className={this.state.tempClassName}> Temperature: {this.state.temp}°F</h5>
            </div>
            :
            <div>
              {(!this.state.loadLocation) ?
                <button className="get-weather-button" onClick={this.handleClick}>Get My Weather</button>
                :

                <p className="weather-data-points">Loading Weather..</p>
              }
            </div>
          }

        </header>
      </div >
    );
  }
}

export default App;








