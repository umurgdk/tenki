// @flow

import React from 'react';
import EmptyIcon from 'react-icons/lib/fa/inbox';

import './EmptyGrid.css';

export interface Props {
  on_search_place: () => any;
}

export default class EmptyGrid extends React.Component<Props> {
  render() {
    return (
      <div className="EmptyGrid">
        <div className="EmptyGridInner">
          <EmptyIcon className="EmptyIcon" size={120} />
          <p>Let's start with adding some locations to see their weather conditions</p>
          <button className="btn btn-primary" onClick={this.props.on_search_place}>Add a Location</button>
        </div>
      </div>
    );
  }
}
