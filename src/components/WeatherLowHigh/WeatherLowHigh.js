// @flow

import React from 'react';

import './WeatherLowHigh.css';

export interface Props {
  low: number;
  high: number;
  unit: string;
  both_show_sign: boolean;
}

export default class WeatherLowHigh extends React.Component<Props> {
  static defaultProps = {
    both_show_sign: false
  }

  render() {
    const sign = `°${this.props.unit}`;
    return (
      <div className="WeatherLowHigh">
        <span className="TemperatureHigh">{this.props.high}{this.props.both_show_sign && sign} </span>
        <span className="TemperatureSeparator">/</span>
        <span className="TemperatureLow"> {this.props.low}{sign}</span>
      </div>
    );
  }
}
