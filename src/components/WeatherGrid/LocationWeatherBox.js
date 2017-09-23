// @flow

import React from 'react';

import WeatherIcon from '../WeatherIcon/WeatherIcon';
import WeatherLowHigh from '../WeatherLowHigh/WeatherLowHigh';

import type { Weather } from '../../lib/types/Weather';
import type { Place } from '../../lib/types/Place';

import './LocationWeatherBox.css';

export interface Props {
  weather: Weather;
  place: Place;
  on_click: (w: Weather, l: Place) => void;
}

export default class LocationWeatherBox extends React.Component<Props> {
  on_click = () => {
    this.props.on_click(this.props.weather, this.props.place);
  }

  get_weather_class() {
    if (this.props.weather.condition.text.match(/cloudy/i)) {
      return 'day-cloudy';
    } else {
      return 'day-sunny';
    }
  }

  render() {
    const todays_forecast = this.props.weather.forecast[0];
    const className = `LocationWeatherBox ${this.get_weather_class()}`;

    return (
      <div className={className}>
        <WeatherIcon className="Background" weather={this.props.weather.condition} size="5x" />
        <div className="LocationName">
          <span>{this.props.place.name}</span>
          <WeatherIcon weather={this.props.weather.condition} size="1x" />
        </div>
        <WeatherLowHigh unit="C" low={todays_forecast.low_temperature} high={todays_forecast.high_temperature} />
      </div>
    );
  }
}
