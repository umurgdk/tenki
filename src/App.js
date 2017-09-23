// @flow

import React from 'react';
import { connect } from 'react-redux';

import type { Weather } from './lib/types/Weather';
import type { Place } from './lib/types/Place';
import type { State } from './app_state/state';

import AppHeader from './components/AppHeader/AppHeader';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import EmptyGrid from './components/WeatherGrid/EmptyGrid';
import AddPlaceDialog from './components/AddPlaceDialog/AddPlaceDialog';

import * as Actions from './app_state/actions';

import './App.css';

interface Props {
	app_state: State;

	search_places: (s: string) => any;
	get_weather: (p: Place) => any;
	show_add_place_dialog: () => any;
	show_dashboard: () => any;
}

class App extends React.Component<Props> {
	render_grid() {
		if (this.props.app_state.weathers.length === 0) {
			return <EmptyGrid on_search_place={this.props.show_add_place_dialog} />;
		}

		return <WeatherGrid weathers={this.props.app_state.weathers}
												places={this.props.app_state.places} />;
	}

	render_add_places_dialog() {
		return <AddPlaceDialog on_fetch_results={this.props.search_places}
													 on_select_place={this.props.get_weather}
													 search_in_progress={this.props.app_state.place_search_in_progress}
													 search_results={this.props.app_state.add_place_search_results} />
	}

	render() {
		return (
			<div className="App">
				<div className="AppSafe">
					<AppHeader on_navigate_dashboard={this.props.show_dashboard} on_search_places={this.props.show_add_place_dialog} />
					<div className="AppContent">
						{ this.render_grid() }
						{ this.props.app_state.show_add_place_dialog && this.render_add_places_dialog() }
					</div>
				</div>
			</div>
		);
	}
}

const map_state_to_props = (state: State) => ({
	app_state: state
});

const map_dispatch_to_props = (dispatch) => ({
	search_places: (s: string) => dispatch(Actions.search_places(s)),
	get_weather: (p: Place) => dispatch(Actions.get_weather(p)),
	show_dashboard: () => dispatch(Actions.show_dashboard()),
	show_add_place_dialog: () => dispatch(Actions.show_add_place_dialog())
});

export default connect(map_state_to_props, map_dispatch_to_props)(App);
