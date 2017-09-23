// @flow

import type YqlApi, { YqlQueryResponse } from './YqlApi';
import type { Place } from './types/Place';
import type { Weather, WeatherForecast } from './types/Weather';

/**
 * A simple wrapper around yql weather.forecast api
 */
export default class WeatherApi {
  yql: YqlApi;

  constructor(yql: YqlApi) {
    this.yql = yql;
  }

  /**
   * Converts `YqlForecast` to `Forecast`
   * @private
   * @param {YqlPlace} place
   * @param {YqlForecast} yql_forecast
   */
  _to_forecast(place: Place, yql_forecast: YqlForecast): WeatherForecast {
    return {
      place_id: place.id,
      date: new Date(yql_forecast.date),
      high_temperature: yql_forecast.high,
      low_temperature: yql_forecast.low,
      text: yql_forecast.text
    };
  }

  /**
   * Converts `YqlForecastItem` to `Weather`
   * @private
   * @param {Place} place
   * @param {YqlForecastItem} yql_weather
   */
  _to_weather(place: Place, yql_weather: YqlForecastItem): Weather {
    const condition = yql_weather.condition;
    return {
      place_id: place.id,
      condition: {
        place_id: place.id,
        date: new Date(condition.date),
        temperature: condition.temp,
        text: condition.text
      },
      forecast: yql_weather.forecast.map(forecast => this._to_forecast(place, forecast))
    };
  }

  /**
   * Fetches a week long forecast for the given place
   * @param {Place} place A place
   */
  async get_forecast(place: Place): Promise<?Weather> {
    const yql_query = `select item from weather.forecast where woeid=${place.id} and u='c'`;
    let result: YqlQueryResponse<YqlWeatherResults> = await this.yql.query(yql_query);

    if (result.count > 1) {
      return this._to_weather(place, result.results.channel[0].item);
    } else if (result.count === 1) {
      return this._to_weather(place, result.results.channel.item);
    }

    return null;
  }
}

export interface YqlWeatherResults {
  channel: { item: YqlForecastItem };
}

export interface YqlForecastItem {
  title: string;
  lat: number;
  long: number;
  link: string;
  pubDate: string;
  condition: YqlWeatherCondition;
  forecast: Array<YqlForecast>;
}

export interface YqlWeatherCondition {
  code: number;
  date: string;
  temp: number;
  text: string;
}

export interface YqlForecast {
  code: number;
  date: string;
  day: string;
  high: number;
  low: number;
  text: string;
}
