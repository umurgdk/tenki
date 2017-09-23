// @flow

import type { Weather } from '../lib/types/Weather';
import type { Place } from '../lib/types/Place';

export interface State {
	add_place_search_results: Place[];
  place_search_in_progress: boolean;
  fetch_weather_in_progress: boolean;
  show_add_place_dialog: boolean;

	weathers: Weather[];
	places: Map<number, Place>;
}

export const InitialState: State = {
  add_place_search_results: [],
  place_search_in_progress: false,
  fetch_weather_in_progress: false,
  show_add_place_dialog: false,

  weathers: [],
  places: new Map()
};
