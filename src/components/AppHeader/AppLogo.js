// @flow

import React from 'react';

import WeatherIcons from 'react-weathericons';

import './AppLogo.css';

export interface Props {
  on_click: ?() => any;
}

export default class AppLogo extends React.Component<Props> {
  render() {
    return (
      <button onClick={this.props.on_click} className="AppLogo safe-padding">
        <WeatherIcons className="AppLogoIcon" name="day-fog" />
        <h1>Tenki</h1>
      </button>
    );
  }
}
