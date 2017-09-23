// @flow

import type { State } from './state';

import {
  FETCH_PLACE_SEARCH_RESULTS,
  FINISH_PLACE_SEARCH_RESULTS,

  FETCH_WEATHER_DATA,
  FINISH_WEATHER_DATA,
  ADD_WEATHER_TO_LIST,

  SHOW_ADD_PLACES_DIALOG,
  HIDE_ADD_PLACES_DIALOG
} from './actions';

export default function reducer(state: State, action: any): State {
  switch(action.type) {
    case FETCH_PLACE_SEARCH_RESULTS:
      return { ...state, place_search_in_progress: true };

    case FINISH_PLACE_SEARCH_RESULTS:
      const places = action.places;
      return { ...state, place_search_in_progress: false, add_place_search_results: places };

    case FETCH_WEATHER_DATA:
      return { ...state, fetch_weather_in_progress: true };

    case FINISH_WEATHER_DATA:
      return { ...state, fetch_weather_in_progress: false };

    case ADD_WEATHER_TO_LIST:
      const weather = action.weather;
      const place = action.place;

      const weathers = [...state.weathers, weather];
      let new_places = new Map(state.places);
      new_places.set(place.id, place);

      return { ...state, weathers, places: new_places, add_place_search_results: [] };

    case SHOW_ADD_PLACES_DIALOG:
      return { ...state, show_add_place_dialog: true };

    case HIDE_ADD_PLACES_DIALOG:
      return { ...state, show_add_place_dialog: false };

    default:
      return state;
  }
}
