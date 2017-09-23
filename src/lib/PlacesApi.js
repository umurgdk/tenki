// @flow

import type YqlApi, { YqlQueryResponse } from './YqlApi';
import type { Place } from './types/Place';

/**
 * A simple wrapper around yql geo.places api
 */
export default class PlacesApi {
  yql: YqlApi;

  constructor(yql: YqlApi) {
    this.yql = yql;
  }

  /**
   * Converts `YqlPlace` to `Place`
   * @param {YqlPlace} yql_place
   */
  to_place(yql_place: YqlPlace): Place {
    return {
      id: yql_place.woeid,
      name: yql_place.name
    };
  }

  /**
   * Search for places for the given name
   * @param {string} query A place name to fetch search results
   */
  async search(query: string): Promise<Place[]> {
    const yql_query = `select name, woeid from geo.places where text='${query}'`;
    let result: YqlQueryResponse<YqlPlaceResults> = await this.yql.query(yql_query);

    let places = [];
    if (result.count > 1) {
      places = result.results.place.map(this.to_place);
    } else if (result.count === 1) {
      // $FlowFixMe
      places = [this.to_place(result.results.place)];
    }

    return places;
  }
}

export interface YqlPlaceResults {
  place: YqlPlace[];
}

export interface YqlPlace {
  woeid: number;
  name: string;
}
