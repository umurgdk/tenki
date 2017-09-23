// @flow

import React from 'react';
import SearchIcon from 'react-icons/lib/fa/search';
import SpinnerIcon from 'react-icons/lib/fa/spinner';

import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
import ListView from '../ListView/ListView';
import PlaceItem from './PlaceItem';

import type { Place } from '../../lib/types/Place';
import type { IObservable, Subscription } from '../../lib/event_stream/Observable';

import './AddPlaceDialog.css';

export interface Props {
  on_select_place: (p: Place) => any;
  on_fetch_results: (s: string) => any;
  search_results: Place[];
  search_in_progress: boolean;
}

export default class AddPlaceDialog extends React.Component<Props> {
  _subscription: ?Subscription;
  _query_observable: ?IObservable<string>;

  register_query_observable = (o: IObservable<string>) => {
    if (this._subscription) {
      this._subscription.destroy();
    }

    this._query_observable = o;
    this._subscription = this._query_observable.subscribe(this.props.on_fetch_results);
  }

  render_place = (place: Place, on_select_item: (p: Place) => any) => {
    return <PlaceItem place={place} on_click={on_select_item} />;
  }

  render_search_results() {
    return (
      <div>
        <h2>Locations:</h2>
        <div className="PlaceSearchResults">
          <ListView items={this.props.search_results}
                    item_renderer={this.render_place}
                    on_select_item={this.props.on_select_place} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="AddPlaceDialog">
        <h2>Add a Location</h2>
        <div className="SearchBox">
          <AutoCompleteInput placeholder="Try entering a place name, e.g Tokyo..." min_chars={2} throttle={300} ref_observable={this.register_query_observable} />
          <div className="icon">
            { this.props.search_in_progress && <SpinnerIcon className="spin" size={24} /> }
            { !this.props.search_in_progress && <SearchIcon size={24} /> }
          </div>
        </div>
        { this.props.search_results.length > 0 && this.render_search_results() }
      </div>
    )
  }

  componentWillUnmount() {
    if (this._subscription) {
      this._subscription.destroy();
    }
  }
}
