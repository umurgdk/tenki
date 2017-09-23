// @flow

import YqlApi from '../lib/YqlApi';
import WeatherApi from '../lib/WeatherApi';
import PlacesApi from '../lib/PlacesApi';

import type { Place } from '../lib/types/Place';
import type { Weather } from '../lib/types/Weather';

// TODO: use dependency injection instead of using globals
const yql_api = new YqlApi('');
const places_api = new PlacesApi(yql_api);
const weather_api = new WeatherApi(yql_api);

export const FETCH_PLACE_SEARCH_RESULTS = 'START_SEARCHING_PLACES';
export const FINISH_PLACE_SEARCH_RESULTS = 'FINISH_PLACE_SEARCH_RESULTS';

export const FETCH_WEATHER_DATA = 'FETCH_WEATHER_DATA';
export const FINISH_WEATHER_DATA = 'FINISH_WEATHER_DATA';
export const ADD_WEATHER_TO_LIST = 'ADD_WEATHER_TO_LIST';

export const SHOW_ADD_PLACES_DIALOG = 'SHOW_ADD_PLACES_DIALOG';
export const HIDE_ADD_PLACES_DIALOG = 'HIDE_ADD_PLACES_DIALOG';

export function show_dashboard() {
  return { type: HIDE_ADD_PLACES_DIALOG };
}

export function show_add_place_dialog() {
  return { type: SHOW_ADD_PLACES_DIALOG };
}

export function search_places(query: string): (any) => any {
  return async (dispatch) => {
    dispatch({ type: FETCH_PLACE_SEARCH_RESULTS });

    try {
      const places = await places_api.search(query);
      dispatch({ type: FINISH_PLACE_SEARCH_RESULTS, places });
    } catch (e) {
      console.error(e);
      // TODO: Do error handling
    }
  };
}

export function get_weather(place: Place): (any) => any {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_DATA });

    try {
      const weather = await weather_api.get_forecast(place);
      dispatch({ type: FINISH_WEATHER_DATA });

      // TODO: Do error handling
      if (!weather) {
        console.warn('Weather is empty');
        return;
      }

      dispatch({
        type: ADD_WEATHER_TO_LIST,
        place,
        weather
      });
    } catch (e) {
      console.error(e);
      // TODO: Do error handling
    } finally {
      dispatch(show_dashboard());
    }
  };
}
