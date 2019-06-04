import React, {Component} from "react";
import Forecast from "./Forecast";
import Api from "../services/api";
import Moment from "react-moment";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: "",
      weatherMain: "",
      wind: "",
      myCity: "",
      temp: "",
      search: "",
      icon: "",
      forecast: "inactive",
      forecastMain: []
    };
  }

  goForecast(id) {
    Api.getForecast(id).then(json => {
      console.log(this.groupByDay(json.list));
      this.setState({forecastMain: json.list});
      this.setState({forecast: "active"});
    });
  }

  groupByDay(weatherList) {
    return weatherList.reduce((group, weather) => {
      const d = new Date(weather.dt * 1000);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      if (!group[d.getTime()]) 
        group[d.getTime()] = [];
      
      group[d.getTime()].push(weather);
      return group;
    }, {});
  }

  weatherDiv() {
    if (this.state.search === "") {
      return <h1>Veuillez effectuer une recherche</h1>;
    }
    if (this.state.cod === "error") {
      return <h1>Vous n'avez pas rentré un nom de ville valide</h1>;
    }

    return <div/>;
  }

  search() {
    Api.GetWeather(this.state.city).then(json => {
      this.setState({weatherMain: json.weather[0].main});
      this.setState({wind: json.wind.speed});
      this.setState({temp: json.main.temp});
      this.setState({myCity: json.name});
      var myicon = json.weather[0].icon;
      this.setState({
        icon: "http://openweathermap.org/img/w/" + myicon + ".png"
      });
      console.log(json);
    });
  }
  componentDidMount() {}
  handlecity(text) {
    this.setState({city: text.target.value});
  }

  forecastShow() {}

  render() {
    return (<div className="container">
      <div className="search">
        <h1 className="title">my little weather app</h1>
        <div>
          Welcome here, with this app you will have access to datas in real time from all around the world!!!
        </div>
        <input type="text" placeholder="enter city" onChange={text => {
            this.handlecity(text);
          }}/>{" "}
        <button className="btn btn-danger" onClick={() => {
            this.search();
          }}>
          {" "}
          submit your ressearch{" "}
        </button>{" "}
      </div>
      {
        this.state.weatherMain !== ""
          ? (<div className="WeatherResults">
            <h1>
              {" "}
              Vous recherchez la température de la ville :{this.state.city}
            </h1>
            <h2>Résultats de la recherche pour {this.state.myCity}</h2>
            <div>
              {"The time is " + this.state.weatherMain + " at " + this.state.myCity + ", the wind blows at a speed off " + this.state.wind + " , the middle temperature outside is off " + this.state.temp}
            </div>
            <img src={this.state.icon} className="weatherIcon"/>
            <i className="fa fa-spinner fa-spin"/>
            <div id={this.props.id} onClick={() => {
                this.goForecast(this.state.myCity);
              }}>
              {" "}
              <div className="link">Voir prévision</div>
            </div>{" "}
          </div>)
          : (<span/>)
      }

      {
        this.state.forecast !== "inactive"
          ? (<div className="ForecastResults">
            <h1>Voici les prévisions pour la ville :{this.state.myCity}</h1>

            {
              this.state.forecastMain.map(prevision => {
                return (<ul>
                  <li className="d-flex flex-column justify-content-start align-items-center p-0">
                    {
                      `The ${prevision.dt_txt} the cloud will be ${
                      prevision.weather[0].main} and the temperature will be ${
                      prevision.main.temp} degrees celsius`
                    }
                    <img src={`http://openweathermap.org/img/w/${
                      prevision.weather[0].icon}.png`} alt="image meteo" className="forecastIcon"/>
                  </li>
                </ul>);
              })
            }
          </div>)
          : (<span/>)
      }
    </div>);
  }
}
