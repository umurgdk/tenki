// @flow

const YQL_URL = 'https://query.yahooapis.com/v1/public/yql';

/**
 * Yahoo! YQL Api client
 * TODO: Use api key ^.^ be good citizen
 */
export default class YqlApi {
  api_key: string;

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  /**
   * Builds a valid YQL query url
   * @param {string} query YQL query
   */
  _build_url(query: string): string {
    return `${YQL_URL}?q=${encodeURIComponent(query)}&format=json`
  }

  /**
   * Fetches YqlQueryResult for the given yql query
   * @param {string} query_string YQL query string
   */
  async query<T>(query_string: string): YqlQueryResult<T> {
    const response = await fetch(this._build_url(query_string));
    const json = await response.json();
    return json['query'];
  }
}

export interface YqlQueryResponse<T> {
  count: number;
  created: string;
  lang: string;
  results: T;
}

export type YqlQueryResult<T> = Promise<YqlQueryResponse<T>>;
