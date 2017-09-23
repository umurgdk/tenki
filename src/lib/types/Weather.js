// @flow

export interface Weather {
  place_id: number;
  condition: WeatherCondition;
  forecast: WeatherForecast[];
}

export interface WeatherCondition {
  place_id: number;
  date: Date;
  temperature: number;
  text: string;
}

export interface WeatherForecast {
  place_id: number;
  date: Date;
  low_temperature: number;
  high_temperature: number;
  text: string;
}
