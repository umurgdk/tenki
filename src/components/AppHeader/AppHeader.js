// @flow

import React from 'react';
import PlaceAddIcon from 'react-icons/lib/md/add-location'

import AppLogo from './AppLogo';
import './AppHeader.css';

export interface Props {
  on_search_places: () => any;
  on_navigate_dashboard: () => any;
}

export default class AppHeader extends React.Component<Props> {
  render() {
    return (
      <div className="AppHeader">
        <AppLogo on_click={this.props.on_navigate_dashboard} />
        <button className="HeaderAction" onClick={this.props.on_search_places}>
          <PlaceAddIcon size={24} />
        </button>
      </div>
    );
  }
}
