// @flow

import React from 'react';
import WeatherIcons from 'react-weathericons';
import 'weather-icons/css/weather-icons.min.css';

import type { WeatherForecast, WeatherCondition } from '../../lib/types/Weather';

export interface Props {
  weather: WeatherCondition | WeatherForecast;
  size: ?string;
}

export default class WeatherIcon extends React.Component<Props> {
  static defaultProps = {
    size: ''
  }

  getIconName(): string {
    if (this.props.weather.text.match(/cloudy/i)) {
      return 'day-cloudy';
    } else {
      return 'day-sunny';
    }
  }

  render() {
    const className = this.props.className || 'WeatherIcon';
    return <WeatherIcons size={this.props.size} className={className} name={this.getIconName()} />;
  }
}
