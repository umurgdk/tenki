// @flow

import React from 'react';

import ListView from '../ListView/ListView';
import LocationWeatherBox from './LocationWeatherBox';

import type { Weather } from '../../lib/types/Weather';
import type { Place } from '../../lib/types/Place';

import { noop } from '../../util';

import './WeatherGrid.css';

export interface Props {
  weathers: Weather[];
  places: Map<number, Place>;
  on_select_weather: (Weather) => void;
}

export default class WeatherGrid extends React.Component<Props> {
  static defaultProps = {
    on_select_weather: noop
  };

  on_render_weather = (weather: Weather, on_select: (w: Weather, p: Place) => void) => {
    const place = this.props.places.get(weather.place_id);
    if (place) {
      return <LocationWeatherBox on_click={on_select} weather={weather} place={place} />;
    }

    // TODO: Error handling
    return null;
  }

  render() {
    return (
      <div className="WeatherGrid">
        <ListView
          item_renderer={this.on_render_weather}
          items={this.props.weathers}
          on_item_select={this.props.on_select_weather} />
      </div>
    );
  }
}
